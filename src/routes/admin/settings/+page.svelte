<script lang="ts">
    export let data:PageData
    import type { PageData } from "./$types"
    import type { AssetData } from "cms/types";
    import type { UpdateSettingFunc,UpdateUserFunc } from "cms/funcs"
    import Utils from "cms/utils"
    // packages
    import { addToast } from "cms/packages/toasts"
    // components
    import MetaData from "cms/components/shared/MetaData.svelte"
    import PageTitle from "cms/components/shared/PageTitle.svelte"
    import Content from "cms/components/shared/layout/Content.svelte"
    import LeftContent from "cms/components/shared/layout/LeftContent.svelte"
    import RightContent from "cms/components/shared/layout/RightContent.svelte"
    import Label from "cms/components/shared/Label.svelte"
    import Button from "cms/components/shared/Button.svelte"
    import FileExplorer from "cms/components/shared/fileExplorer/fileExplorer.svelte";
    import ChangePassword from "./ChangePassword.svelte";
    // elements
    import ToggleSwitch from "cms/components/elements/ToggleSwitch.svelte"
    import Input from "cms/components/elements/Input.svelte"
    import InputNumber from "cms/components/elements/InputNumber.svelte"
    import TextArea from "cms/components/elements/TextArea.svelte"
    // icons
    import CloudIcon from "cms/icons/Cloud.svelte"
    import AssetViewer from "cms/components/shared/ViewAsset.svelte";
    import LockIcon from "cms/icons/Lock.svelte";

    $: appData = data.appData
    $: userData = data.userData
    $: appSocialMedias = appData.site.socialMedias as any
    let loading:boolean = false
    let changingPass:boolean = false
    let fileExplorerOpen:boolean = false

    /** Save changes */
    async function saveChanges() {
        loading = true
        // save changes
        const apiLoadData:UpdateSettingFunc['input'] = { name:"updateSettings",data:appData }
        const apiResponse:UpdateSettingFunc['output'] = await Utils.fetch("/",apiLoadData)
        await Utils.sleep(500) // wait 1 second
        // show msg with response message
        if(apiResponse.ok) addToast({ msg:apiResponse.msg,type:"ok" })
        else addToast({ msg:apiResponse.msg,type:"error" })
        await Utils.sleep(500) // wait 1 second
        loading = false
    }

    /** Update user */
    async function updateImage(e:any) {
        const asset:AssetData = e.detail
        userData.image = asset
        // update user
        const apiLoad:UpdateUserFunc['input'] = { name:"updateUser",data:userData }
        const apiResponse:UpdateUserFunc['output'] = await Utils.fetch("/",apiLoad)
        // show msg with response message
        if(apiResponse.ok) addToast({ msg:apiResponse.msg,type:"ok" })
        else addToast({ msg:apiResponse.msg,type:"error" })
    }
</script>

<MetaData title="Settings"/>
<PageTitle title="Settings" link={{ href:"/logout",text:"Logout" }}/>
<FileExplorer bind:open={fileExplorerOpen} on:selectAsset={updateImage}/>
<ChangePassword bind:open={changingPass} />
<Content>
    <LeftContent>
        <Label text="App name" />
        <Input placeholder="App name..." bind:value={appData.site.name}/>
        <Label text="Title" />
        <Input placeholder="Site title..." bind:value={appData.site.title}/>
        <Label text="Description" />
        <TextArea placeholder="Site description..." bind:value={appData.site.description}/>
        <Label text="Assets per pages" />
        <InputNumber placeholder="Number of assets to show..." bind:value={appData.config.assetsPerPage}/>
        <Label text="Users per pages" />
        <InputNumber placeholder="Number of users to show..." bind:value={appData.config.usersPerPage}/>
        <Label text="Routes per pages" />
        <InputNumber placeholder="Number of routes to show..." bind:value={appData.config.routesPerPage}/>
        <Label text="Objects per pages" />
        <InputNumber placeholder="Number of objects to show..." bind:value={appData.config.objectsPerPage}/>
    </LeftContent>
    <RightContent>
        <Label text="Update image"/>
        <AssetViewer asset={userData.image} on:click={()=>fileExplorerOpen=!fileExplorerOpen}/>
        {#each Object.entries(appData.site.socialMedias) as [mediaName]}
            <Label text={mediaName} />
            <Input placeholder="{mediaName}..." bind:value={appSocialMedias[mediaName]}/>
        {/each}
        <Label text="Change password" />
        <Button text="Change" icon={LockIcon} on:click={()=>changingPass=true} bind:loading={changingPass}/>
        <Label text="Allow users">
            <ToggleSwitch bind:checked={appData.config.allowNewUser} />
        </Label>
        <Button text="Save changes" icon={CloudIcon} on:click={saveChanges} bind:loading/>
    </RightContent>
</Content>