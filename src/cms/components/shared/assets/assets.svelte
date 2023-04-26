<script lang="ts">
    export let assets:AssetData[]
    import type { AssetData } from "cms/types"
    import Asset from "./asset.svelte"
</script>

<div class="assets">
    {#each assets as asset (asset._id)}
        <Asset {asset} on:assetClick/>
    {/each}
</div>

<style lang="scss">
    .assets{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 15px;
    }
</style>