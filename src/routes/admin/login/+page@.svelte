<script lang="ts">
    export let data:PageServerData
    import"cms/static/cms.css"
    import type { PageServerData } from "./$types";
    import type { UserLoginLoad,UserLoginData } from "cms/types"
    import Utils from "cms/utils";
    // packages
    import { addToast } from "cms/packages/toasts";
    // components
    import Layout from "./components/layout.svelte"
    import Form from "./components/form.svelte"
    import InputField from "./components/inputField.svelte"
    import Submit from "./components/submit.svelte"
    import Logo from "./components/logo.svelte";
    import MetaData from "cms/components/shared/MetaData.svelte";
    let email:string = ""
    let password:string = ""
    let checkForError:boolean = false
    let loading:boolean = false
    $: emailError = checkForError && email.trim()===""
    $: passwordError = checkForError && password.trim()===""
    $: appData = data.appData
    
    /** Try to login user */
    async function login() {
        loading = true
        checkForError = true
        emailError = !isValidEmail(email)
        const runFunc = !emailError && !emailError
        if(runFunc){
            const apiLoadData:UserLoginLoad = { email,password }
            const apiResponse:UserLoginData = await Utils.fetch("/login",apiLoadData)
            if(apiResponse.ok) {
                addToast({ msg:apiResponse.msg,type:"ok" })
                await Utils.sleep(1000) // wait 1 second
                location.href = appData!.config.cmsPath
            }
            else addToast({ msg:apiResponse.msg,type:"error" })
        }else addToast({ msg:"Make sure to enter email and password",type:"error" })
        loading = false
    }

    /** Validate email */
    function isValidEmail(email:string) {
        console.log(email)
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return regex.test(email);
    }
</script>

<MetaData title="Login" siteName="svelteCMS" description="Please login"/>
<Layout>
    <Logo />
    <Form>
        <InputField bind:value={email} error={emailError} type="email" placeholder="email..."/>
        <InputField bind:value={password} error={passwordError} type="password" placeholder="password..."/>
        <Submit bind:loading on:click={login}/>
    </Form>
</Layout>