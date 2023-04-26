<script lang="ts">
    export let isNew:boolean = false
    export let element:ElementData;
    export let objects: RouteObjectData[];
    import type { RouteObjectData,ElementData } from "cms/types";
    // components
    import Object from "./Object.svelte";
</script>

<div class="objects">
    {#each objects as object (object._id)}
        <Object {object} {element} {isNew} on:addObject on:deleteObject/>
    {/each}
</div>

<style lang="scss">
    .objects{
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 15px;
    }
</style>