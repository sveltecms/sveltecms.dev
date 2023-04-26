<script lang="ts">
    export let element:ElementData
    export let checkForErrors:boolean
    import type { AssetData, ElementData } from "cms/types";
    // elements
    import DateTime from "cms/components/elements/DateTime.svelte";
    import ToggleSwitch from "cms/components/elements/ToggleSwitch.svelte";
    // components
    import Label from "cms/components/shared/Label.svelte"
    import ImageViewer from "cms/components/shared/ImageViewer.svelte";
    import FileExplorer from "cms/components/shared/fileExplorer/fileExplorer.svelte";
    let show:boolean = ["asset","dateTime","boolean"].includes(element.type)
    let btnText:string = element.type==="asset" ? "Update" : ""
    let showFileExplorer:boolean = false
    $: error = checkForErrors && !element.value && element.value!==false

    /** handle file explorer */
    function handleFileExplorer(e:any){
        const asset:AssetData = e.detail
        // set asset to element value
        element.value = asset
    }
</script>

<FileExplorer bind:open={showFileExplorer} on:selectAsset={handleFileExplorer}/>
{#if show}
    <Label text={element.title} {btnText} on:click={()=>showFileExplorer=true} {error}>
        {#if element.type==="boolean" }
            <ToggleSwitch bind:checked={element.value}/>
        {/if}
    </Label>
    {#if element.type==="asset" && element.value}
        <ImageViewer asset={element.value}/>
    {:else if element.type==="dateTime"}
        <DateTime bind:value={element.value}/>
    {/if}
{/if}
