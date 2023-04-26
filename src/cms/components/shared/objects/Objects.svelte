<script lang="ts">
    export let deleting:boolean = false
    export let objects:RouteObjectData[]
    import type { RouteObjectData } from "cms/types";
    import Object from "./Object.svelte";
</script>

<div class="objects">
    {#each objects as object}
        <Object bind:deleting {object} on:delete />
    {/each}
</div>

<style>
    .objects{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
</style>