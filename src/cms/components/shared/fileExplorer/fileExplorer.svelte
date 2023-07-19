<script lang="ts">
    export let open:boolean
    import type { AssetData } from "cms/types";
    import type { SearchAssetsFunc } from "cms/funcs"
    import { createEventDispatcher } from "svelte";
    import Utils from "cms/utils";
    import PopUpBox from 'cms/components/shared/PopUpBox.svelte';
    import Search from "./Search.svelte"
    import Assets from "./assets/assets.svelte";
    import NoResult from "./NoResult.svelte";
    import Upload from "./Upload.svelte";
    const dispatch = createEventDispatcher()
    let assets:AssetData[] = []
    let searchValue:string = ""

    /** Search assets */
    async function searchAssets() {
        const apiLoad:SearchAssetsFunc['input'] = { name:"searchAssets", data:{ query:searchValue,pageNum:1 } }
        const apiResponse:SearchAssetsFunc['output'] = await Utils.fetch("/",apiLoad)
        if(apiResponse.ok && apiResponse.data.length>0){ assets = [...apiResponse.data] }
        else{ assets = [] }
    }

    /** Send custom event */
    async function selectAsset(e:any){
        const asset:AssetData = e.detail
        dispatch("selectAsset",asset)
        resetAll()
        // close file explorer
        open = false
    }

    /** Reset all data */
    function resetAll(){
        assets = []
        searchValue = ""
    }
</script>

<PopUpBox bind:open>
    <Search bind:value={searchValue} on:change={searchAssets}/>
    {#if searchValue.trim().length>0 && assets.length===0}
        <NoResult {searchValue}/>
        <Upload on:assetUploaded on:assetUploaded={e=>{assets=[...assets,e.detail]}} />
    {:else if assets.length>0}
        <Assets {assets} on:assetClick={selectAsset}/>
    {/if}
    {#if searchValue.trim().length===0}
        <Upload on:assetUploaded on:assetUploaded={e=>{assets=[...assets,e.detail]}}/>
    {/if}
</PopUpBox>