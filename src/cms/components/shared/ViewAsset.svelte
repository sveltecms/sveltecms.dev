<script lang="ts">
    export let asset:AssetData
    import type { AssetData } from "cms/types";
</script>

<div class="image" on:click on:keypress>
    <img src={asset.src} alt={asset.title}>
</div>

<style lang="scss">
    .image{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 15px;
    }
    img{
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
    }
</style>