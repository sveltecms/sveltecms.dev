<script lang="ts">
    const API_PATH = "/admin/auth"
    let email:string = ""
    let password:string = ""
    let showPassword:boolean = false
    let showPasswordConfirm:boolean = false
    let checkForError:boolean = false
    let submitting:boolean = false
    $: errorOn = {
        email: checkForError && email.trim() === "" || checkForError && email.trim() !== "" && !isValidEmail(email),
        password: checkForError && password.trim() === ""
    }
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    // STYLES
    import "$StaticFiles/layout.css"
    // TYPES
    import type { ApiAuthLoginData, AuthLoginLoad } from "$Types";
    // UTILITIES
    import { fetchPost, wait } from "$Utilities"
    import { newToast } from "@anthony809/svelte-toasts/index";
    import Toasts from "@anthony809/svelte-toasts/Toasts.svelte";
    // ICONS
    import EnvelopeAt from "$Icons/EnvelopeAt.svelte";
    import ShieldLockIcon from "$Icons/ShieldLock.svelte";
    import EyeIcon from "$Icons/Eye.svelte";
    import EyeSlashIcon from "$Icons/EyeSlash.svelte";
    import Spinner from "$Comps/Spinner.svelte";

    /** Validate email */
    function isValidEmail(email:string) {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(email);
    }

    /** Show or hide password and password confirmation */
    function showAndHide(what:"password"|"confirm"){
        if(what==="password") showPassword = !showPassword
        if(what==="confirm") showPasswordConfirm = !showPasswordConfirm
    }

    /** Handle form submission */
    async function handleSubmit(){
        submitting = true // Form is being submitted
        checkForError = true // Check for empty and other form errors
        // Check for any empty or error on fields
        if(errorOn.email || errorOn.password){
            await wait(500)
            submitting = false // Reset
            return
        }
        // Make api request
        const apiLoad:AuthLoginLoad = { email, password }
        const apiResponse:ApiAuthLoginData = await fetchPost("POST",API_PATH,apiLoad)
        if(apiResponse.ok){
            newToast({ type:"ok",msg:apiResponse.msg })
            await wait(2000)
            window.location.href = "/admin"
        } else newToast({ type:"error",msg:apiResponse.msg })
        // Reset stages
        await wait(500)
        submitting = false // Reset
    }
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Login",
        description:svelteCMS.site.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
<Toasts />
<div class="page">
    <img class="logo" src="/admin/logo.png" alt="svelteCMS">
    <form class="form">
        <div class="field" class:error={errorOn.email}>
            <div class="icon"><EnvelopeAt size=15/></div>
            <input type="email" name="email" placeholder="email..." bind:value={email}>
        </div>
        <div class="field" class:error={errorOn.password}>
            <div class="icon"><ShieldLockIcon size=15/></div>
            {#if showPassword}
                <input type="text" name="password" placeholder="password..." bind:value={password}>
                <div class="icon eye" on:click={()=>showAndHide("password")}>
                    <EyeSlashIcon size=15/>
                </div>
            {:else}
                <input type="password" name="password" placeholder="password..." bind:value={password}>
                <div class="icon eye" on:click={()=>showAndHide("password")}>
                    <EyeIcon size=15/>
                </div>
            {/if}
        </div>
        <button class="button" type="submit" class:submitting disabled={submitting} on:click|preventDefault={handleSubmit}>
            {#if submitting}<Spinner size=13 />{/if}Login
        </button>
    </form>
</div>

<style lang="scss">
    $textColor: #8f8f8f;
    .page{
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .logo{
        width: 90px;
        margin-bottom: 20px;
    }
    .form{
        max-width: 350px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--antiBodyBg);
        padding: 20px;
        border-radius: 5px;
    }
    .field{
        width: 100%;
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: 50px;
        overflow: hidden;
        margin-bottom: 10px;
        box-shadow: 1px 2px 4px rgba(0,0,0,.3);
        transition: scale ease-in-out 0.2s, background-color ease 0.4s;
        &:focus,&:hover{
            outline: none;
            scale: 1.02;
        }
        &.error{
            background-color: #af8989;
            input,input::placeholder,.icon{
                color: white;
                fill: white;
            }
            input:-webkit-autofill,input:-webkit-autofill{
                    -webkit-box-shadow: 0 0 0 30px #af8989 inset !important;
            }
        }
    }
    input{
        background-color: transparent;
        font-size: 13px;
        font-weight: 300;
        color: $textColor;
        border: none;
        width: 100%;
        padding: 10px;
        &:-webkit-autofill{
            -webkit-box-shadow: 0 0 0 30px rgb(255, 255, 255) inset;
        }
        &:focus{
            outline: none;
        }
       
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        fill: #bababa;
        margin-left: 10px;
        &.eye{
            cursor: pointer;
            margin: 0 10px 0 0;
            background-color: rgba(0,0,0,3%);
            padding: 3px;
            border-radius: 50%;
        }
    }
    .button{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 100%;
        border: none;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        color: var(--buttonColor);
        background-color: var(--buttonBg);
        transition: scale ease-in-out 0.2s;
        box-shadow: 1px 2px 4px rgba(0,0,0,.3);
        &.submitting{
            cursor: not-allowed;
            opacity: 80%;
        }
        &:focus,&:hover{
            outline: none;
            scale: 1.02;
        }
    }
</style>