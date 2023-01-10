<script lang="ts">
    /** Whether file uploader is open or close */
    export let open:boolean
    export let allowSelection:boolean = true
    import CloseIcon from "$Icons/Close.svelte"
    import SearchAssets from "./components/SearchAssets.svelte";
    import UploadAsset from "./components/UploadAsset.svelte";
    /** Close file uploader */
    function closeFileUploader(e:Event){
        const element = e.target as HTMLDivElement
        const canClose = ( element.classList.contains("closeBtn") || element.classList.contains("uploader") )
        if(canClose){ open = false }
    }
    // Variables
    let showSearch:boolean
</script>

{#if open}
<div class="uploader" on:click={closeFileUploader} on:keypress={closeFileUploader}>
    <div class="content">
        <div class="closeBtn" on:click={closeFileUploader} on:keypress={closeFileUploader}>
            <CloseIcon />
        </div>
        {#if showSearch}
            <SearchAssets bind:open on:select {allowSelection}/>
        {/if}
        <UploadAsset bind:showSearch bind:open on:select/>
    </div>
</div>
{/if}

<style>
    .uploader{
        z-index: 100;
        position: fixed;
        top: 0; left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,.6);
        display: flex;
        align-items: center;
        justify-content: center;
        /* Color */
        --bodyBg: #23272F;
        --antiBodyBg: #2e323a;
        --textColor: #efefef;
        --iconColor: #efefef;
        --buttonBg: #055765;
        --buttonColor: #efefef;
    }
    .content{
        max-width: 350px;
        width: 95%;
        background-color: var(--bodyBg);
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-radius: 5px;
        position: relative;
    }
    .closeBtn{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -16px;
        right: -16px;
        background-color: var(--antiBodyBg);
        padding: 10px;
        border-radius: 50%;
        fill: var(--iconColor);
        box-shadow: 0 0 4px rgba(0,0,0,.2);
    }
    .closeBtn:global(.closeBtn svg){
        pointer-events: none;
    }
</style>