<script lang="ts">
    export let allowSelection:boolean
    export let open:boolean
    export let assets:AssetData[]
    import type { AssetData } from "$Types"
    import Asset from "./Asset.svelte";
</script>

<div class="assets">
    {#each assets as asset (asset._id)}
        <Asset {allowSelection} {asset} bind:open on:select/>
    {/each}
</div>

<style>
    .assets{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 10px;
    }
</style>