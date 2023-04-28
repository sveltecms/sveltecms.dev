<script lang="ts">
    export let deleting:boolean
    export let object:RouteObjectData
    import type { RouteObjectData } from "cms/types";
    import JsonIcon from "cms/icons/FiletypeJson.svelte";
    import ActionsButtons from "./ActionsButtons.svelte";
    import ObjectTable from "./ObjectTable.svelte";
</script>

<div class="object">
    <div class="objectContainer">
        <div class="jsonIcon">
            <JsonIcon />
        </div>
        <span class="name">{object._id}</span>
        <ActionsButtons bind:deleting {object} on:delete/>
    </div>
    <ObjectTable {object}/>
</div>

<style lang="scss">
    .object{
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding:7px 10px;
        margin-bottom: 15px;
        background-color: var(--antiBodyBg);
        box-shadow: var(--boxShadow);
        border-radius: 5px;
    }
    .objectContainer{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .jsonIcon{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-right: 15px;
        box-shadow: var(--boxShadow2);
        background-color: #086a9b38;
        fill: var(--textColor);
    }
    .name{
        font-size: 17px;
        font-weight: 300;
        margin-right: 10px;
        color: var(--textColor);
        flex: 1;
    }
    // Mobile
    @media(max-width:700px){
        .name{
            /* Fix overflow on mobile */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 120px;
        }
    }
</style>