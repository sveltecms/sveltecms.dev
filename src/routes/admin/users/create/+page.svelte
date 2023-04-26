<script lang="ts">
    export let data:PageData
    import type { PageData } from "./$types"
    import type { AssetData, UserLoad } from "cms/types"
    import type { CreateUserFunc } from "cms/funcs"
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
    import PasswordInput from "cms/components/elements/PasswordInput.svelte"
    // icons
    import CloudPlusIcon from "cms/icons/CloudPlus.svelte"
    import LabelSelector from "cms/components/elements/LabelSelector.svelte";
    let appData = $page.data.appData
    let fileExplorerOpen:boolean = false
    let loading:boolean = false
    //
    let checkForErrors:boolean = false
    let firstName:string = ""
    let lastName:string = ""
    let password:string = ""
    let email:string = ""
    let role:"user"|"admin" = "user"
    let image:AssetData = data.defaultAsset

    /** When user select asset from file explorer */
    function selectAsset(e:any){
        const selectedAsset:AssetData = e.detail
        image = selectedAsset
    }

    /** Add new user */
    async function createUser() {
        checkForErrors = true
        loading = true
        // user object
        const userData:UserLoad = {
            firstName, lastName, email, password, image,
            role, createdAt: new Date(),updatedAt: new Date()
        }
        const userDataError = Utils.validateUserData(userData)
        // if user data was not validated
        if(userDataError){ addToast({ type:"error",msg:userDataError }) }
        // if user data was validated, create user
        else{
            const apiLoad:CreateUserFunc['input'] = { name:"createUser",data:userData }
            const apiResponse:CreateUserFunc['output'] = await Utils.fetch("/",apiLoad)
            // if user was created
            if(apiResponse.ok){
                addToast({ type:"ok",msg:apiResponse.msg })
                await Utils.sleep(2000)
                location.href = appData.config.cmsPath
            }
            // else if user was not created
            else{ addToast({ type:"error",msg:apiResponse.msg }) }
        }
        // reset stages
        loading = false
    }
</script>

<FileExplorer bind:open={fileExplorerOpen} on:selectAsset={selectAsset}/>
<MetaData title="Create user"/>
<PageTitle title="Create user" goBackHref="/users"/>
<Content>
    <LeftContent>
        <Label text="FirstName" />
        <Input placeholder="first name..." bind:value={firstName} error={checkForErrors && !firstName.trim()}/>
        <Label text="LastName" />
        <Input placeholder="last name..." bind:value={lastName} error={checkForErrors && !lastName.trim()}/>
        <Label text="Email" />
        <Input placeholder="user email..." bind:value={email} error={checkForErrors && !email.trim()}/>
        <Label text="Password" />
        <PasswordInput placeholder="password..." bind:value={password} error={checkForErrors && !password.trim()}/>
    </LeftContent>
    <RightContent>
        <LabelSelector text="Role" options={["admin","user"]} bind:value={role}/>
        <Label text="Update image"/>
        <ViewAsset asset={image} on:click={()=>fileExplorerOpen=true}/>
        <Button {loading} text="Create" icon={CloudPlusIcon} on:click={createUser}/>
    </RightContent>
</Content>