<script lang="ts">
    export let open:boolean
    import type { AssetData } from "cms/types";
    import type { SearchAssetsFunc,UploadFileFunc } from "cms/funcs"
    import Utils from "cms/utils";
    import PopUpBox from 'cms/components/shared/PopUpBox.svelte';
    import Button from 'cms/components/shared/Button.svelte';
    import Search from "./Search.svelte"
    import Assets from "./assets/assets.svelte";
    import NoResult from "./NoResult.svelte";
    // packages
    import { addToast } from "cms/packages/toasts"
    // icon
    import UploadIcon from "cms/icons/Upload.svelte"
    // svelte
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    let assets:AssetData[] = []
    let searchValue:string = ""
    let fileInput:HTMLInputElement
    let loading:boolean = false

    /** Search assets */
    async function searchAssets() {
        const apiLoad:SearchAssetsFunc['input'] = { name:"searchAssets", data:{ query:searchValue,pageNum:1 } }
        const apiResponse:SearchAssetsFunc['output'] = await Utils.fetch("/",apiLoad)
        if(apiResponse.ok && apiResponse.data.length>0){ assets = [...apiResponse.data] }
        else{ assets = [] }
    }

    /** Upload asset */
    async function uploadAsset(){
        // set loading stage
        loading = true
        // upload file
        const files = fileInput.files as FileList
        const formData = new FormData()
        formData.append("image",files[0])
        const apiResponse:UploadFileFunc['output'] = await Utils.fetch("/",formData,false)
        // if file was uploaded
        // show msg with response message
        if(apiResponse.ok){
            addToast({ msg:apiResponse.msg,type:"ok" })
            assets = [apiResponse.data,...assets]
            // send event
            const asset:AssetData = apiResponse.data
            dispatch("assetUploaded",asset)
        }
        else addToast({ msg:apiResponse.msg,type:"error" })
        // remove loading stage
        loading = false
    }

    /** Send custom event */
    async function selectAsset(e:any){
        const asset:AssetData = e.detail
        dispatch("selectAsset",asset)
        // close file explorer
        open = false
    }
</script>

<PopUpBox bind:open>
    <Search bind:value={searchValue} on:change={searchAssets}/>
    {#if assets.length>0}
        <Assets {assets} on:assetClick={selectAsset}/>
    {/if}
    {#if searchValue.trim().length>0 && assets.length===0}
        <NoResult {searchValue}/>
    {/if}
    <input style="display:none" type="file" max="1" accept="image/*" bind:this={fileInput} on:change={uploadAsset}>
    <Button bind:loading margin={assets.length>0 ? "15px 0 0 0" : "0"} circle text="Upload" icon={UploadIcon} on:click={()=>fileInput.click()}/>
</PopUpBox>