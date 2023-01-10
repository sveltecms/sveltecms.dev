<script lang="ts">
    export let category:CategoryData
    import type { CategoryData } from "$Types"
    import { createEventDispatcher } from "svelte";
    import { page } from "$app/stores";
    // Components
    import ConfirmationSimple from "$Comps/ConfirmationSimple.svelte";
    // Icons
    import TrashIcon from "$Icons/Trash.svelte";
    import CloseIcon from "$Icons/Xmark.svelte"
    import PenIcon from "$Icons/PenNib.svelte"
    /** Delete category */
    function handleDeleteCategory(){ dispatcher("delete",category) }
    /** Edit category */
    function handleEditCategory(){ dispatcher("edit",category) }
    // Variables
    const dispatcher = createEventDispatcher()
    /** current route id */
    $: routeID = $page.params.routeID
    /** Show confirmation when click delete */
    let showDeleteConfirmation:boolean = false
    /** Edit category link */
    $: editHref = `/admin/categories/${routeID}/${category.slug}`
    /** a link attribute */
    const attributes = { "data-sveltekit-preload-data":"" }
</script>


<div class="actions">
    <a {...attributes} href={editHref} class="icon" data-label="Edit {category.name}" on:click={handleEditCategory}>
        <PenIcon size=15/>
    </a>
    <div class="icon trash" data-label="Delete {category.name}" on:click={()=>showDeleteConfirmation=!showDeleteConfirmation}>
        {#if showDeleteConfirmation}
            <ConfirmationSimple on:confirm={handleDeleteCategory} /> 
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