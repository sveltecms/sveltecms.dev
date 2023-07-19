<script lang="ts">
    import type { AssetData } from "cms/types";
    import type { UploadFileFunc,UploadUrlFileFunc } from "cms/funcs"
    import { createEventDispatcher } from "svelte";
    import { addToast } from "cms/packages/toasts";
    import Utils from "cms/utils";
    import Button from "cms/components/elements/Button.svelte";
    // Icons
    import UploadIcon from "cms/icons/Upload.svelte"

    /** Upload assets */
    async function uploadAssets() {
        loading = true // set loading stage
        // upload file
        const files = input.files as FileList
        // Loop all files and upload them
        for(const file of files){
            const formData = new FormData() ; formData.append("image",file)
            const apiResponse:UploadFileFunc['output'] = await Utils.fetch("/",formData,false)
            // if file was uploaded show msg with response message and add to assets
            if(apiResponse.ok){
                addToast({ msg:`File:${apiResponse.data.title} was uploaded`,type:"ok" })
                // send event
                const asset:AssetData = apiResponse.data
                dispatch("assetUploaded",asset)
            }
            else addToast({ msg:apiResponse.msg,type:"error" })
            Utils.sleep(500) // Wait 500 milliseconds
        }
        loading = false // remove loading stage
    }

    /** Upload url asset */
    async function uploadUrlAsset() {
        loading = true // set loading stage
        const apiLoad:UploadUrlFileFunc['input'] = { name:"uploadUrlFile",data:{ url:fileUrl } }
        const apiResponse:UploadUrlFileFunc['output'] = await Utils.fetch("/",apiLoad)
        // if file was uploaded show msg with response message and add to assets
        if(apiResponse.ok){
            addToast({ msg:`File:${apiResponse.data.title} was uploaded`,type:"ok" })
            // send event
            const asset:AssetData = apiResponse.data
            dispatch("assetUploaded",asset)
        }
        else addToast({ msg:apiResponse.msg,type:"error" })
        Utils.sleep(500) // Wait 500 milliseconds
        loading = false // remove loading stage
    }

    const dispatch = createEventDispatcher()
    let fileUrl:string = ""
    let input:HTMLInputElement
    let loading:boolean = false
    const attributes = { type:"file", multiple:true, max:"10", accept:"image/*" }
</script>

<input {...attributes} bind:this={input} on:change={uploadAssets}>
<input type="url" bind:value={fileUrl} placeholder="https://domain.com/image.png">
<!-- Show file url upload button -->
{#if fileUrl.trim().length>4}
    <Button bind:loading text="Upload url" icon={UploadIcon} on:click={uploadUrlAsset}/>
<!-- Show file input upload button -->
{:else}
    <Button bind:loading text="Upload file" icon={UploadIcon} on:click={()=>input.click()}/>
{/if}

<style lang="scss">
    input[type=file]{ display: none; }
    input[type=url]{
        font-size: 14px;
        font-weight: 400;
        color: var(--textColor);
        padding: 7px 10px;
        border-radius: 20px;
        border: none;
        background-color: var(--antiBodyBg);
        margin-top: 10px;
        margin-bottom: 10px;
        &:focus{
            outline:none;
        }
    }
</style>