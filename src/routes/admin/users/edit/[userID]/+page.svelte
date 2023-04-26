<script lang="ts">
    export let data:PageData
    import type { PageData } from "./$types"
    import type { AssetData, UserData, UserLoad } from "cms/types"
    import type { UpdateUserFunc } from "cms/funcs"
    import { page } from "$app/stores"
    import Utils from "cms/utils"
    // packages
    import { addToast } from "cms/packages/toasts"
    // components
    import MetaData from "cms/components/shared/MetaData.svelte"
    import PageTitle from "cms/components/shared/PageTitle.svelte"
    import ViewAsset from "cms/components/shared/ViewAsset.svelte"
    import Content from "cms/components/shared/layout/Content.svelte"
    import LeftContent from "cms/components/shared/layout/LeftContent.svelte"
    import RightContent from "cms/components/shared/layout/RightContent.svelte"
    import Label from "cms/components/shared/Label.svelte"
    import Button from "cms/components/shared/Button.svelte"
    import FileExplorer from "cms/components/shared/fileExplorer/fileExplorer.svelte";
    // elements
    import Input from "cms/components/elements/Input.svelte"
    // icons
    import CloudIcon from "cms/icons/Cloud.svelte"
    import LabelSelector from "cms/components/elements/LabelSelector.svelte";
    let appData = $page.data.appData
    let fileExplorerOpen:boolean = false
    let loading:boolean = false
    // user info
    let checkForErrors:boolean = false
    let firstName:string = data.userData.firstName
    let lastName:string = data.userData.lastName
    let email:string = data.userData.email
    let role:"user"|"admin" = data.userData.role
    let image:AssetData = data.userData.image

    /** When user select asset from file explorer */
    function selectAsset(e:any){
        const selectedAsset:AssetData = e.detail
        image = selectedAsset
    }

    /** Update user */
    async function updateUser() {
        checkForErrors = true
        loading = true
        // user object
        const userData = {
            firstName, lastName, email, image,
            role,updatedAt: new Date(),_id:data.userData._id
        }
        // TODO: validate data
        const apiLoad:UpdateUserFunc['input'] = { name:"updateUser",data:userData }
        const apiResponse:UpdateUserFunc['output'] = await Utils.fetch("/",apiLoad)
        await Utils.sleep(500)
        // if user was updated
        if(apiResponse.ok){
            addToast({ type:"ok",msg:apiResponse.msg })
        }
        // else if user was not updated
        else{ addToast({ type:"error",msg:apiResponse.msg }) }
        // reset stages
        await Utils.sleep(500)
        loading = false
    }
</script>

<FileExplorer bind:open={fileExplorerOpen} on:selectAsset={selectAsset}/>
<MetaData title="Update user"/>
<PageTitle title="Update user" goBackHref="/users"/>
<Content>
    <LeftContent>
        <Label text="FirstName" />
        <Input placeholder="first name..." bind:value={firstName} error={checkForErrors && !firstName.trim()}/>
        <Label text="LastName" />
        <Input placeholder="last name..." bind:value={lastName} error={checkForErrors && !lastName.trim()}/>
        <Label text="Email" />
        <Input placeholder="user email..." bind:value={email} error={checkForErrors && !email.trim()}/>
    </LeftContent>
    <RightContent>
        <LabelSelector text="Role" options={["admin","user"]} bind:value={role}/>
        <Label text="Update image"/>
        <ViewAsset asset={image} on:click={()=>fileExplorerOpen=true}/>
        <Button {loading} text="Save changes" icon={CloudIcon} on:click={updateUser}/>
    </RightContent>
</Content>