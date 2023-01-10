<script lang="ts">
    const API_PATH = "/admin/api/assets"
    /** Whether file uploader is open or close */
    export let open:boolean = true
    export let showSearch:boolean = true
    import type { AssetData, ApiAssetCreateData } from "$Types"
    import { fetchPost } from "$Utilities";
    import ImagePreview from "./ImagePreview.svelte";
    import SaveIcon from "$Icons/Cloud.svelte";
    import CancelIcon from "$Icons/Close.svelte";
    import UploadIcon from "$Icons/Upload.svelte"
    import RotateIcon from "$Icons/Rotate.svelte";
    import Spinner from "./Spinner.svelte";
    import { createEventDispatcher } from "svelte";
    /** Create event dispatch and close file uploader */
    const dispatch = createEventDispatcher()
    function sendDispatch(asset:AssetData){
        // Send event
        dispatch("select",asset)
        // Close file uploader
        open = false
    }
    /** Handle file input change */
    function handleFileChange(){
        const file = fileInput.files![0]
        fileTempSrc = URL.createObjectURL(file)
        assetName = file.name.split(".")[0]
        showSearch = false
    }
    /** Cancel file upload */
    function resetFileInput(){
        fileInput.value = ""
        fileTempSrc = ""
        assetName = ""
        showSearch = true
    }
    /** Upload new file */
    async function uploadFile(){
        const file = fileInput.files![0]
        const formData = new FormData ; formData.append("image",file)
        const apiResponse:ApiAssetCreateData = await fetchPost("PUT",API_PATH,formData,false,{ assetName })

        // If file was uploaded, send dispatch and close file uploader
        if(apiResponse.ok){
            const asset:AssetData = {
                _id: apiResponse._id,
                name: apiResponse.name,
                path: apiResponse.path,
                type: apiResponse.type,
                extension: apiResponse.extension
            }
            sendDispatch(asset)
        }
        // Alert any error
        else alert(apiResponse.msg)
        // Reset file input after uploaded
        resetFileInput()
    }
    // Variables
    let fileInput:HTMLInputElement
    let loading:boolean = false
    let fileTempSrc:string = ""
    let assetName:string
    /** Label for upload button */
    $: label = fileTempSrc ? "Update" : "Upload"
</script>

{#if fileTempSrc}
    <ImagePreview src={fileTempSrc} bind:alt={assetName}/>
{/if}
<div class="buttons">
    {#if fileTempSrc}
        <button class="btn save" on:click={uploadFile}>
            {#if loading}<Spinner/>{/if}
            <SaveIcon/>&nbsp;Save
        </button>
        <button class="btn cancel" on:click={resetFileInput}>
            <CancelIcon/>&nbsp;Cancel
        </button>
    {/if}
    <input type="file" accept=".png,.jpg,.webp" id="file" bind:this={fileInput} on:change={handleFileChange}>
    <label class="btn" for="file">
        {#if label==="Update"}<RotateIcon size=15/>{:else}<UploadIcon/>{/if}
        &nbsp;{label}
    </label>    
</div>

<style>
    .buttons{
        display: flex;
        align-items: center;
    }
    .buttons:global(svg){ margin: 50px; }
    .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        cursor: pointer;
        border: none;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        fill: var(--buttonColor);
        font-size: 15px;
        text-align: center;
        font-weight: 400;
        padding: 10px 15px;
        border-radius: 50px;
        box-shadow: 1px 1px 4px rgba(0,0,0,.3);
    }
    .save,.cancel{ margin-right:10px }
    .cancel{ background-color: #6e3e3e }
    input[type=file]{ display: none;}
</style>