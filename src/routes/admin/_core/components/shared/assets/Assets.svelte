<script lang="ts">
    const API_PATH = "/admin/api/assets"
    export let assets:AssetData[]
    import { fade } from "svelte/transition"
    import type { AssetData } from "$Types";
    import type { ApiAssetDeleteLoad,ApiAssetDeleteData,ApiAssetUpdateLoad,ApiAssetUpdateData } from "$Types/api";
    import { fetchPost, wait } from "$Utilities";
    import { ASSETS } from "$Stores"
    // Icons
    import UpdateIcon from "$Icons/RotateRight.svelte"
    import TrashIcon from "$Icons/Trash.svelte"
    // Components
    import Asset from "./Asset.svelte";
    import PopUpBox from "$Comps/PopUpBox.svelte"
    import Label from "$Elements/Label.svelte"
    import Input from "$Elements/Input.svelte"
    import Button from "$Elements/Button.svelte"
    import ImagePreview from "$Comps/routes/ImagePreview.svelte"
    // Packages
    import { newToast } from "@anthony809/svelte-toasts/index"
    /** Handle asset click */
    async function handleAssetClick(e:any) {
        const asset:AssetData = e.detail
        assetToEdit = asset
        popUpBoxOpen = true
    }
    /** Update asset */
    async function UpdateAsset() {
        // Set loading for update button
        updatingAsset = true
        // Send update asset request
        const apiLoad:ApiAssetDeleteLoad = assetToEdit
        const apiResponse:ApiAssetDeleteData = await fetchPost("POST",API_PATH,apiLoad)
        // If asset was updated
        if(apiResponse.ok){
            newToast({ type:"ok",msg:apiResponse.msg })
            ASSETS.set([...$ASSETS])
            await wait(500)
            resetPopUpBox()
        }
        // Alert error, if asset was not updated
        else{ newToast({ type:"error",msg:apiResponse.msg }) }
        // Remove loading for update button
        updatingAsset = false
    }
    /** Delete asset */
    async function deleteAsset() {
        // Set loading for delete button
        deletingAsset = true
        // Send delete asset request
        const apiLoad:ApiAssetDeleteLoad = assetToEdit
        const apiResponse:ApiAssetDeleteData = await fetchPost("DELETE",API_PATH,apiLoad)
        // If asset was deleted
        if(apiResponse.ok){
            newToast({ type:"ok",msg:apiResponse.msg })
            // Update current assets list
            const newAssetsList = assets.filter(data=>data._id!==assetToEdit._id)
            ASSETS.set([...newAssetsList])
            await wait(500)
            resetPopUpBox()
        }
        // Alert error, if asset was not deleted
        else{ newToast({ type:"error",msg:apiResponse.msg }) }
        // Remove loading for delete button
        deletingAsset = false
    }
    /** Reset all stages */
    function resetPopUpBox() {
        updatingAsset = false
        deletingAsset = false
        showDeleteConfirmation = false
        popUpBoxOpen = false
    }
    // Variables
    /** Asset to be edit, set before opening popUpBox */
    let assetToEdit:AssetData
    /** Indicate if pop up box is open or not */
    let popUpBoxOpen:boolean = false
    /** True when click update asset button */
    let updatingAsset:boolean = false
    /** True when click delete asset button */
    let deletingAsset:boolean = false
    /** Indicate if waiting to confirm asset deleting */
    let showDeleteConfirmation:boolean = false
</script>

<PopUpBox bind:open={popUpBoxOpen} on:close={resetPopUpBox}>
    <Label text="Asset name"/>
    <Input placeholder="Asset name.." bind:value={assetToEdit.name}/>
    <ImagePreview image={assetToEdit} maxWidth="auto"/>
    {#if showDeleteConfirmation}
        <Button --buttonBg="#774c40" text="Yes Delete asset" loading={deletingAsset} on:click={deleteAsset}/>
        <Button text="No keep asset" loading={deletingAsset} on:click={()=>showDeleteConfirmation=false}/>
    {:else}
        <Button --buttonBg="#774c40" text="Delete" icon={TrashIcon} loading={deletingAsset||updatingAsset} on:click={()=>showDeleteConfirmation=true}/>
        <Button text="Update" icon={UpdateIcon} loading={deletingAsset||updatingAsset} on:click={UpdateAsset}/>
    {/if}
</PopUpBox>

<div class="assets" in:fade="{{duration:200}}">
    {#each assets as asset (asset._id)}
        <Asset {asset} on:click={handleAssetClick}/>
    {/each}
</div>

<style lang="scss">
    .assets{
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }
</style>