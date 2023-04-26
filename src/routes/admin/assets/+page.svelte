<script lang="ts">
    export let data: PageData;
    import type { PageData } from './$types';
    import type { AssetData } from 'cms/types';
    import type { UpdateAssetFunc,DeleteAssetFunc } from 'cms/funcs';
    import Utils from "cms/utils"
    import { addToast } from 'cms/packages/toasts';
    import MetaData from "cms/components/shared/MetaData.svelte";
    import PageTitle from 'cms/components/shared/PageTitle.svelte';
    import Assets from "cms/components/shared/assets/assets.svelte"
    import AssetEditor from 'cms/components/shared/assetEditor.svelte';
    import NoResult from "cms/components/shared/NoResult.svelte"
    import Pagination from "cms/components/shared/Pagination.svelte";
    import FileExplorer from 'cms/components/shared/fileExplorer/fileExplorer.svelte';
    $: assets = data.assets
    let asset:AssetData
    let assetEditorOpen:boolean = false
    let updating:boolean = false
    let deleting:boolean = false
    let showFileExplorer:boolean = false

    /** update asset using e.detail=AssetData from event*/
    async function setAssetToUpdate(e:any) {
        const assetData:AssetData = e.detail
        asset = assetData
        assetEditorOpen = true
    }

     /** update asset */
     async function updateAsset() {
        updating = true
        const apiLoad:UpdateAssetFunc['input'] = { name:"updateAsset",data:asset }
        const response:UpdateAssetFunc['output'] = await Utils.fetch("/",apiLoad)
        await Utils.sleep(1000)
        // show msg with response message
        if(response.ok){
            addToast({ msg:response.msg,type:"ok" })
            // update updated asset in assets list
            const newAssetsList = assets.map(data=>{
                if(data.assetID===asset.assetID){
                    data = asset
                }
                return data
            })
            assets = [...newAssetsList]
        }
        else addToast({ msg:response.msg,type:"error" })
        await Utils.sleep(1000)
        assetEditorOpen = false
        updating = false
    }

    /** delete asset */
    async function deleteAsset() {
        deleting = true
        const apiLoad:DeleteAssetFunc['input'] = { name:"deleteAsset",data:asset }
        const response:DeleteAssetFunc['output'] = await Utils.fetch("/",apiLoad)
        // show msg with response message
        if(response.ok){
            await Utils.sleep(500)
            addToast({ msg:response.msg,type:"ok" })
            await Utils.sleep(500)
            // remove deleted asset from assets list
            const newAssetsList = assets.filter(data=>data.assetID!==asset.assetID)
            assets = [...newAssetsList]
        }
        else addToast({ msg:response.msg,type:"error" })
        await Utils.sleep(500)
        assetEditorOpen = false
        deleting = false
    }
    /** Handle page title button click */
    function handleTitleClick(){
        showFileExplorer = !showFileExplorer
    }

    /** Handle asset uploaded*/
    function handleAssetUploaded(e:any){
        const newAsset:AssetData = e.detail
        assets = [newAsset,...assets]
    }
</script>

<FileExplorer bind:open={showFileExplorer} on:assetUploaded={handleAssetUploaded}/>
<MetaData title="Assets"/>
<PageTitle title="Assets" btnText="Upload" on:click={handleTitleClick} on:keypress={handleTitleClick}/>
<AssetEditor {updating} {deleting} bind:open={assetEditorOpen} bind:asset on:update={updateAsset} on:delete={deleteAsset}/>
<Assets {assets} on:assetClick={setAssetToUpdate}/>
{#if assets.length===0}
    <NoResult title="No assets founded" subTitle="Please create new asset to be displayed here" hrefText="Upload asset" href="/assets" on:click={()=>showFileExplorer=true}/>
{/if}
<Pagination baseDir="assets" itemsCount={data.count} page={data.page} itemsPerPage={data.itemsPerPage}/>