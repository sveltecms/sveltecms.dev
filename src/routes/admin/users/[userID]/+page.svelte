<script lang="ts">
    export let data:PageData
    const API_PATH = "/admin/api/users"
    let userData:UserData = data.userData
    let passwordConfirm:string = ""
    let isFileUploaderOpen:boolean = false
    let checkForErrors:boolean = true
    let loading:boolean = false
    $: errorOnField = {
        firstName:checkForErrors && userData.firstName.trim() === "",
        lastName:checkForErrors && userData.lastName.trim() === "",
        email:checkForErrors && userData.email.trim() === "",
        password:checkForErrors && userData.password.trim() === "",
        passwordConfirm:checkForErrors && userData.password.trim() !== passwordConfirm.trim(),
    }
    import type { PageData } from "./$types";
    import type { UserData, ApiUserUpdateLoad, ApiUserUpdateData,AssetData } from "$Types";
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    import { goto } from "$app/navigation";
    import { fetchPost, validateUserData, wait } from "$Utilities"
    import PageTitleLink from "$Comps/PageTitleLink.svelte";
    // Packages
    import { newToast } from "@anthony809/svelte-toasts/index";
    import FileUploader from "$Packages/fileUploader/FileUploader.svelte";
    // Icons
    import UpdateIcon from "$Icons/RotateRight.svelte";
    import PasswordIcon from "$Icons/ShieldLock.svelte"
    import EmailIcon from "$Icons/EnvelopeAt.svelte"
    // Routes components
    import Content from "$Comps/routes/Content.svelte";
    import LeftContent from "$Comps/routes/LeftContent.svelte";
    import RightContent from "$Comps/routes/RightContent.svelte";
    import ImagePreview from "$Comps/routes/ImagePreview.svelte";
    // Components
    import Label from "$Elements/Label.svelte";
    import Input from "$Elements/Input.svelte";
    import EmailInput from "$Elements/EmailInput.svelte";
    import PasswordInput from "$Elements/PasswordInput.svelte";
    import Button from "$Elements/Button.svelte";
    import ButtonSelector from "$Elements/buttonSelector/ButtonSelector.svelte";

    /** Handle new/update user */
    async function publish() {
        loading = true
        checkForErrors = true
        const validatorErrors = validateUserData(userData)
        const validated = validatorErrors.length===0
        // If user data was not validated
        if(!validated){
            newToast({ type:"error",msg:validatorErrors[0] })
            await wait(500)
            // Remove loading from publish button and stop function
            loading = false
            return
        }
        // Else send request to api
        const apiLoadData:ApiUserUpdateLoad = userData
        const apiResponse:ApiUserUpdateData = await fetchPost("POST",API_PATH,apiLoadData)
        // If user was created
        if(apiResponse.ok){
            newToast({ type:"ok",msg:apiResponse.msg })
            await wait(500)
            goto("/admin/users")
        }
        // If user was not created
        else newToast({ type:"error",msg:apiResponse.msg })
        // Remove loading from publish button
        loading = false
    }
    /** Handle file selected */
    function updateUserImage(e:any){
        const asset:AssetData = e.detail
        userData.image = asset
    }
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Editing user",
        description:svelteCMS.site.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
<FileUploader bind:open={isFileUploaderOpen} on:select={updateUserImage}/>
<PageTitleLink href="/admin/users" linkText="All users" title="All users" goBackSrc="/admin/users"/>
<Content>
    <LeftContent>
        <Label text="First name" error={errorOnField.firstName}/>
        <Input placeholder="Name..." bind:value={userData.firstName}/>
        <Label text="Last name" error={errorOnField.lastName}/>
        <Input placeholder="Last name..." bind:value={userData.lastName}/>
        <Label text="Email" error={errorOnField.email}/>
        <EmailInput placeholder="Email..." bind:value={userData.email} icon={EmailIcon}/>
        {#if !userData._id}
            <Label text="Password" error={errorOnField.password}/>
            <PasswordInput placeholder="Password..." bind:value={userData.password} icon={PasswordIcon}/>
            <Label text="Password confirm" error={errorOnField.passwordConfirm}/>
            <PasswordInput placeholder="Confirm password..." bind:value={passwordConfirm} icon={PasswordIcon}/>
        {/if}
    </LeftContent>
    <RightContent>
        <Label text="User role"/>
        <ButtonSelector bind:currentValue={userData.role} data={["user","admin","root"]}/>
        <Label text="Profile image"/>
        <ImagePreview image={userData.image}/>
        <Button text="Update image" icon={UpdateIcon} on:click={()=>isFileUploaderOpen=true}/>
        <Button {loading} on:click={publish} text="Update"/>
    </RightContent>
</Content>