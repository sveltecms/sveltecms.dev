<script lang="ts">
    export let deleting:boolean
    export let object:RouteObjectData
    import type { RouteObjectData } from "cms/types";
    import { createEventDispatcher } from "svelte";
    import { page } from "$app/stores";
    // Components
    import Confirm from "cms/components/shared/Confirm.svelte";
    import Spinner from "cms/components/shared/Spinner.svelte";
    // Icons
    import TrashIcon from "cms/icons/Trash.svelte";
    import CloseIcon from "cms/icons/X.svelte"
    import PenIcon from "cms/icons/VectorPen.svelte"
    /** Delete object */
    function handleDeleteObject(e:any){
        const run:boolean = e.detail
        if(run) dispatcher("delete",object)
    }
    // Variables
    const dispatcher = createEventDispatcher()
    /** current route id */
    $: routeID = $page.params.routeID
    /** Show confirmation when click delete */
    let showDeleteConfirmation:boolean = false
    /** Edit object link */
    $: cmsPath = $page.data.appData.config.cmsPath
    $: editHref = `${cmsPath}/routes/${routeID}/${object._id}`

    /** Handle delete button click */
    function handleDeleteClick(){
        showDeleteConfirmation = !showDeleteConfirmation
    }
</script>


<div class="actions">
    <a href={editHref} data-sveltekit-preload-data class="icon" data-label="Edit">
        <PenIcon size=15/>
    </a>
    <div class="icon trash" data-label="Delete" on:click={handleDeleteClick} on:keypress={handleDeleteClick}>
        {#if showDeleteConfirmation}
            <Confirm on:confirm={handleDeleteObject} /> 
        {/if}
        {#if deleting}
            <Spinner margin="0"/>
        {:else if showDeleteConfirmation}
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