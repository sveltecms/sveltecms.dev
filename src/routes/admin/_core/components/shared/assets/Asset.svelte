<script lang="ts">
    import svelteCMS from "$svelteCMS";
    export let asset:AssetData
    import type { AssetData } from "$Packages/fileUploader/types";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    let imageSrc = `${svelteCMS.viewPaths.assets}/images/${asset.path}`
</script>

<div class="asset" on:click={()=>dispatch("click",asset)}>
    <span class="title">{asset.name}</span> 
    <div class="image">
        <img src={imageSrc} alt={asset.name}>
    </div>
</div>

<style lang="scss">
    .asset{
        overflow: hidden;
        width: calc(100% / 8 - 9px);
        max-height: 200px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,.4);
        background-color: var(--antiBodyBg);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform ease-in-out 0.2s;
        position: relative;
        &:hover{
            transform: scale(1.02);
            cursor: pointer;
        }
    }
    .title{
        position: absolute;
        z-index: 5;
        bottom: 0px;
        width: 100%;
        padding: 10px 5px;
        text-align: center;
        background-color: rgba(0,0,0,.9);
        color: white;
        font-size: 14px;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .image{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .image img{
        object-fit:cover;
        object-position: center;
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
    }
    @media(max-width:1500px){
        .asset{
            width: calc(100% / 4 - 9px);
        }
    }
    @media(max-width:1000px){
        .asset{
            width: calc(100% / 2 - 5px);
        }
    }
</style>