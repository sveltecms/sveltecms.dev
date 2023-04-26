<script lang="ts">
    export let isNew:boolean
    export let element:ElementData
    export let object: RouteObjectData;
    import type { RouteObjectData,ElementData } from "cms/types";
    import { page } from "$app/stores"
    import { createEventDispatcher } from "svelte";
    // icons
    import LinkIcon from "cms/icons/Link.svelte"
    import TrashIcon from "cms/icons/Trash.svelte"
    import PlusIcon from "cms/icons/Plus.svelte"
    // components
    import Confirm from "cms/components/shared/Confirm.svelte";
    let searchableKey = object[element.linkedSearchableKey!]
    let showDel:boolean = false
    let linkedToHref:string = `${$page.data.appData.config.cmsPath}/routes/${element.linkTo}/${object._id}`
    const dispatch = createEventDispatcher()

    /** Send event add object */
    function addObject(){ dispatch("addObject",object) }
</script>


<div class="object">
    <div class="left">
        <a href={linkedToHref} target="_blank" class="linkIcon" style="fill:#fff">
            <LinkIcon size=30/>
        </a>
        <div class="title">{searchableKey}</div>
    </div>
    {#if isNew}
        <div class="add" on:click={addObject} on:keypress={addObject}>
            <PlusIcon size=15/></div>
    {:else}
        <div class="delete" on:click={()=>showDel=!showDel} on:keypress={()=>showDel=!showDel}>
            {#if showDel}
                <Confirm on:confirm={e=>{ if(e.detail) dispatch("deleteObject",object)}} />
            {/if}
            <TrashIcon size=15/>
        </div>
    {/if}
</div>

<style lang="scss">
    .object{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-radius: 2px;
        padding: 10px;
        box-shadow: var(--boxShadow2);
        background-color: var(--antiBodyBg);
        color: var(--textColor);
        fill: var(--iconColor);
    }
    .left{
        display: flex;
        align-items: center;
    }
    .linkIcon,.delete,.add{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
        background-color: rgb(8 106 155 / 19%);
        margin-right: 15px;
        position: relative;
    }
    .delete,.add{
        cursor: pointer;
        margin: 0 0 0 10px;
        background-color: #594045;
        padding: 10px;
    }
    .add{ background-color: var(--buttonBg); }
    .title{
        font-size: 25px;
        font-weight: 900;
        text-transform: uppercase;
    }
</style>