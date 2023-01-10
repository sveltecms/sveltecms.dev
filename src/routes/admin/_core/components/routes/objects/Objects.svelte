<script lang="ts">
    export let objects:ObjectData[]
    import type { ObjectData } from "$Types";
    import Object from "./Object.svelte";
</script>

<div class="objects">
    {#each objects as object}
        <Object {object} on:delete />
    {/each}
</div>

<style>
    .objects{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
</style>