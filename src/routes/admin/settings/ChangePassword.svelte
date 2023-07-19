<script lang="ts">
    export let open:boolean
    export let password:string = ""
    export let newPassword:string = ""
    import Label from "cms/components/shared/Label.svelte";
    import PopUpBox from "cms/components/shared/PopUpBox.svelte";
    import Button from "cms/components/shared/Button.svelte";
    import Input from "cms/components/elements/Input.svelte";
    import { addToast } from "cms/packages/toasts/index"
    import Utils from "cms/utils";
    import type { UpdatePasswordFunc } from "cms/funcs";
    let checkError:boolean = false
    let loading:boolean = false
    $: passError = checkError && password.trim()===""
    $: newPassError = checkError && newPassword.trim()===""

    /** Update password */
    async function updatePassword() {
        // Set check error and loading to true
        checkError = true
        loading = true
        // Show error popUp if any error and stop function from running
        if(checkError && password.trim()==="" || checkError && newPassword.trim()===""){
            addToast({ type:"error",msg:"Make sure all fields are completed"})
            loading = false
            return
        }
        // Send request
        const apiLoad:UpdatePasswordFunc['input'] = { name:"updatePassword",data:{ currentPassword:password,newPassword}}
        const apiResponse:UpdatePasswordFunc['output'] = await Utils.fetch("/",apiLoad)
        // Show response message
        addToast({ type:apiResponse.ok?"ok":"error",msg:apiResponse.msg })
        await Utils.sleep(200)
        // If password was updated, closed popUp
        if(apiResponse.ok){
            checkError = false
            password = ""
            newPassword = ""
            open = false
            loading = false
        }
        // remove loading after request is finished
        loading = false
    }
</script>

<PopUpBox bind:open>
    <Label text="Update password"/>
    <Input placeholder="Current password" bind:value={password} error={passError}/>
    <Input placeholder="New password" bind:value={newPassword} error={newPassError}/>
    <Button text="Update" bind:loading on:click={updatePassword}/>
</PopUpBox>