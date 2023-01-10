<script lang="ts">
    export let allowSelection:boolean
    export let open:boolean
    export let asset:AssetData
    import type { AssetData } from "$Types"
    import svelteCMS from "$svelteCMS";
    // SVELTE
    import { createEventDispatcher } from "svelte";
    // ICONS
    import CheckIcon from "$Icons/Check.svelte"
    /** Create event dispatch and close file uploader */
    const dispatch = createEventDispatcher()
    /** SEND CUSTOM EVENT */
    function sendDispatch(){
        if(!allowSelection) return
        // Send event
        dispatch("select",asset)
        // Close file uploader
        open = false
    }
</script>

<div class="asset" on:click={sendDispatch}>
    <div class="image">
        <img src={`${svelteCMS.viewPaths.assets}/images/${asset.path}`} alt={asset.name}>
        {#if allowSelection}
            <div class="select">
                <CheckIcon size=40/>
            </div>
        {/if}
    </div>
    <span class="name">{asset.name}</span>
</div>

<style>
    .asset{
        cursor: pointer;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        overflow: hidden;
        /* the -5px = parent gap / 2 */
        width: calc(100% / 2 - 5px);
        box-shadow: 1px 1px 4px rgba(0,0,0,.3);
        background-color: var(--antiBodyBg);
    }
    .image{
        width: 100%;
        max-height: 150px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .image img{
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        object-position: center;
    }
    .name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-overflow: ellipsis;
        text-align: center;
        background-color: var(--bodyBg);
        padding: 5px;
        font-size: 14px;
        font-weight: 300;
        color: var(--textColor);
    }
    .asset:hover .select{ display: flex; }
    .select{
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        display: none;
        align-items: center;
        justify-content: center;
        fill: var(--iconColor);
    }
    :global(.select svg){
        background-color: rgba(0,0,0,.3);
        padding: 5px;
        border-radius: 50%;
        box-shadow: 0 0 4px rgba(0,0,0,.1);
    }
</style>