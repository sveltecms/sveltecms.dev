<script lang="ts">
    export let tag:TagData
    import type { TagData } from "$Types"
    import { createEventDispatcher } from "svelte";
    import { page } from "$app/stores";
    // Components
    import ConfirmationSimple from "$Comps/ConfirmationSimple.svelte";
    // Icons
    import TrashIcon from "$Icons/Trash.svelte";
    import CloseIcon from "$Icons/Xmark.svelte"
    import PenIcon from "$Icons/PenNib.svelte"
    /** Delete tag */
    function handleDeleteTag(){ dispatcher("delete",tag) }
    /** Edit tag */
    function handleEditTag(){ dispatcher("edit",tag) }
    // Variables
    const dispatcher = createEventDispatcher()
    /** current route id */
    $: routeID = $page.params.routeID
    /** Show confirmation when click delete */
    let showDeleteConfirmation:boolean = false
    /** Edit tag link */
    $: editHref = `/admin/tags/${routeID}/${tag.slug}`
    /** a link attribute */
    const attributes = { "data-sveltekit-preload-data":"" }
</script>


<div class="actions">
    <a {...attributes} href={editHref} class="icon" data-label="Edit {tag.name}" on:click={handleEditTag}>
        <PenIcon size=15/>
    </a>
    <div class="icon trash" data-label="Delete {tag.name}" on:click={()=>showDeleteConfirmation=!showDeleteConfirmation}>
        {#if showDeleteConfirmation}
            <ConfirmationSimple on:confirm={handleDeleteTag} /> 
        {/if}
        {#if showDeleteConfirmation}
            <CloseIcon />
        {:else}
            <TrashIcon />
        {/if}
    </div>
</div>

<style>
    .actions{
        display: flex;
        align-items: center;
    }
    /* .btn{
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 400;
        color: var(--buttonColor);
        fill: var(--buttonColor);
        background-color: var(--buttonBg);
        padding: 5px 10px;
        border-radius: 20px;
        margin-right: 10px;
        box-shadow: var(--boxShadow2);
        border: 1px solid transparent;
        transition: border 0.2s ease-in-out;
    } */
    .icon{
        flex: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        min-width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: var(--mainColor);
        fill: #fff;
        box-shadow: var(--boxShadow2);
        margin-left: 15px;
    }
    .icon.trash{
        background-color: #906565;
    }
</style>