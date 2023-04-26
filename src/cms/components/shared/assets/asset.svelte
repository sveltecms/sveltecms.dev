<script lang="ts">
    export let asset:AssetData
    import type { AssetData } from "cms/types"
    import { createEventDispatcher } from "svelte"
    import { fade } from "svelte/transition";
    const dispatch = createEventDispatcher()
</script>

<div class="asset" in:fade on:click={()=>dispatch("assetClick",asset)} on:keypress={()=>dispatch("assetClick",asset)}>
    <div class="image">
        <img src={asset.src} alt={asset.title}>
    </div>
    <div class="title">{asset.title}</div>
</div>

<style lang="scss">
    .asset{
        cursor: pointer;
        display: flex;
        border-radius: 5px;
        overflow: hidden;
        width: calc(100% / 6 - 17px);
        box-shadow: var(--boxShadow2);
        position: relative;
    }
    .image{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 240px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            // hover effect
            transition: transform ease-in-out 0.4s;
            &:hover{ transform: scale(1.05) rotate(1deg) }
        }
    }
    .title{
        position: absolute;
        bottom: -4px; left: 0;
        font-size: 20px;
        font-weight: 600;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        background-color: rgba(0,0,0,.6);
        color: #e6e6e6;
        width: 100%;
        padding: 10px;
        text-align: center;
        // hide overflow text
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    // on mobile 1000px
    @media(max-width:1000px){
        .asset{
            width: calc(100% / 4 - 15px);
        }
        .title{
            font-size: 14px;
            bottom: 0px;
        }
    }
    // on mobile 700px
    @media(max-width:700px){
        .asset{
            width: calc(100% / 2 - 10px);
        }
    }
</style>