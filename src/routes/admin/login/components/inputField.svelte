<script lang="ts">
    export let type:"email"|"password"|"input"
    export let placeholder:string
    export let value:string
    export let error:boolean
    // icons
    import EnvelopeAt from "cms/icons/EnvelopeAt.svelte";
    import ShieldLockIcon from "cms/icons/ShieldLock.svelte";
    import EyeIcon from "cms/icons/Eye.svelte";
    import EyeSlashIcon from "cms/icons/EyeSlash.svelte";
    let input:HTMLInputElement
    let showPassword:boolean = false
    let attributes = { type, placeholder }
    function handleShowPassword(){
        showPassword = !showPassword
        if(showPassword){ attributes.type = "input" }
        else{ attributes.type = "password" }
    }
</script>

<div class="field" class:error>
    <div class="icon">
        {#if type==="email"}
            <EnvelopeAt size=15/>
        {:else if type==="password"}
            <ShieldLockIcon size=15/>
        {/if}
    </div>
    <input class="input" {...attributes} bind:value bind:this={input} required>
    {#if type==="password"}
        <div class="icon hideIcon" on:click={handleShowPassword} on:keypress={handleShowPassword}>
            {#if showPassword}
                <EyeSlashIcon size=15/>
            {:else}
                <EyeIcon size=15/>
            {/if}
        </div>
    {/if}
</div>


<style lang="scss">
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
    }
    .error{
        background-color: #af8989;
        input,input::placeholder,.icon{ color: white; fill: white; }
        input:-webkit-autofill,input:-webkit-autofill{  -webkit-box-shadow: 0 0 0 30px #af8989 inset !important; }
    }
    .input{
        background-color: transparent;
        font-size: 13px;
        font-weight: 300;
        color: #2e323aab;
        border: none;
        width: 100%;
        padding: 10px;
        &:-webkit-autofill{ -webkit-box-shadow: 0 0 0 30px rgb(255, 255, 255) inset; }
        &:focus{ outline: none; }
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        fill: #bababa;
        margin-left: 10px;
    }
    .hideIcon{
        cursor: pointer;
        margin: 0 10px 0 0;
        background-color: rgba(0,0,0,3%);
        padding: 3px;
        border-radius: 50%;
    }
</style>