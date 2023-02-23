<script lang="ts">
    const API_PATH = "/admin/api/assets"
    export let data:PageServerData
    ASSETS.set(data.assets)
    import type { PageServerData } from "./$types"
    import type { AssetData } from "$Types";
    import type { FetchAssetsLoad,FetchAssetsRes } from "$Types/cms";
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    import { ASSETS } from "$Stores"
    import { wait,fetchPost } from "$Utilities"
    // Icons
    import PlusIcon from "$Icons/Plus.svelte";
    // Components
    import TitleButton from "$Comps/PageTitleButton.svelte";
    import FileUploader from "$Packages/fileUploader/FileUploader.svelte";
    import Assets from "$Comps/shared/assets/Assets.svelte"
    import Button from "$Comps/Button.svelte"
    import NoResult from "$Comps/NoResult.svelte";
    /** Handle file selected from file uploader */
    async function handleFileSelect(e:any) {
        const selectedAsset:AssetData = e.detail
        // Check if selected assets exists in assets list
        const assetInAssets = assets.find(data=>data._id===selectedAsset._id)
        // Add selected asset to assets list
        if(!assetInAssets){
            ASSETS.set([...$ASSETS,selectedAsset])
            assets = [...assets,selectedAsset]
        }
    }
    /** Load more assets */
    async function loadMoreAssets() {
        // Set loading more assets
        isGettingMoreAssets = true
        // Update page number
        pageNumber = pageNumber+1
        // Send api request
        const filter = data.query ? { name:data.query } : null
        const apiLoad:FetchAssetsLoad = { filter, count:svelteCMS.config.assetsPerPage,pageNumber }
        const apiResponse:FetchAssetsRes = await fetchPost("PATCH",API_PATH,apiLoad) 
        if(apiResponse.length>0){
            if(apiResponse.length<svelteCMS.config.assetsPerPage) resetStages()
            // Wait 500 milliseconds
            await wait(500)
            // Marge assets with response assets
            ASSETS.set([...$ASSETS,...apiResponse])
        }
        // Reset stages
        else await resetStages()
        // Remove loading more assets
        isGettingMoreAssets = false
    }
    /** Reset stages */
    async function resetStages(){
        // Wait 500 milliseconds
        await wait(500)
        showLoadMoreBtn = false
        pageNumber = 1
    }

    // When data changes, reset some variables
    $: if(data.assets){
        showLoadMoreBtn = data.assets.length >= svelteCMS.config.assetsPerPage
        pageNumber = 1
        ASSETS.set([...data.assets])
    }

    // Variables 
    /** Indicate if file uploader is open or not */
    let isFileUploaderOpen:boolean = false
    let assets = data.assets
    let showLoadMoreBtn:boolean = $ASSETS.length >= svelteCMS.config.assetsPerPage
    let pageNumber = 1
    /** Indicate when loading more assets */
    let isGettingMoreAssets = false
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Assets",
        description:svelteCMS.site.desc,
        backdrop:svelteCMS.site.backdrop
    }
    $: title = data.query ? `Result for : ${data.query}` : "Assets"
</script>

<SvelteHead {...pageData}/>
<FileUploader allowSelection={false} bind:open={isFileUploaderOpen} on:select={handleFileSelect}/>
{#if $ASSETS.length > 0}
    <TitleButton {title} on:click={()=>isFileUploaderOpen=true} icon={PlusIcon}/>
    <Assets assets={$ASSETS}/>
    {#if showLoadMoreBtn}
        <Button loading={isGettingMoreAssets} text="Load more" centerBtn={true} --width="fit-content" on:click={loadMoreAssets}/>
    {/if}
{:else}
    <NoResult title="No assets" subTitle="Please some assets" href="/admin/assets" hrefText="Add assets" on:click={()=>isFileUploaderOpen=true}/>
{/if}