<script lang="ts">
    export let images:AssetData[]
    import type { AssetData } from "cms/types";
</script>

<div class="images">
    {#each images as image}
        <div class="image">
            <img src={image.src} alt={image.title}>
        </div>
    {/each}
</div>

<style lang="scss">
    .images{
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 20px;
    }
    .image{
        cursor: grab;
        width: calc(100% / 4 - 12px);
        max-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: var(--boxShadow2);
        img{
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            transition: transform ease-in-out 0.3s;
            &:hover{ transform: scale(1.02);}
        }
    }
    // On mobile
    @media(max-width:700px){
        .image{
            width: calc(100% / 2 - 10px);
        }
    }
</style>