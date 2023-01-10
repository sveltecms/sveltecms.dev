<script lang="ts">
    export let route:RouteData
    import type { RouteData } from "$Types"
    import { createEventDispatcher } from "svelte";
    // Components
    import ConfirmationSimple from "$Comps/ConfirmationSimple.svelte";
    // Icons
    import PlusIcon from "$Icons/Plus.svelte";
    import TrashIcon from "$Icons/Trash.svelte";
    import CloseIcon from "$Icons/Xmark.svelte"
    import PenIcon from "$Icons/VectorPen.svelte"
    import ViewIcon from "$Icons/Eye.svelte"
    /** Delete route */
    function handleDeleteRoute(){ dispatcher("delete",route) }
    // Variables
    const dispatcher = createEventDispatcher()
    let showDeleteConfirmation:boolean = false
</script>

<div class="route">
    <a href="/admin/objects/{route.ID}" class="icon objects" data-label="View {route.ID}" data-sveltekit-preload-data>
        <ViewIcon />
    </a>
    <a href="/admin/objects/{route.ID}/create" class="btn add" data-sveltekit-preload-data>
        <PlusIcon />Add object
    </a>
    <span class="name">
        {route.title}
    </span>
    <div class="actions">
        <a href="/admin/routes/{route.ID}" class="icon" data-label="Edit {route.ID}" data-sveltekit-preload-data>
            <PenIcon />
        </a>
        <div class="icon trash" data-label="Delete" on:click={()=>showDeleteConfirmation=!showDeleteConfirmation}>
            {#if showDeleteConfirmation}
                <ConfirmationSimple on:confirm={handleDeleteRoute} /> 
            {/if}
            {#if showDeleteConfirmation}
                <CloseIcon />
            {:else}
                <TrashIcon />
            {/if}
        </div>
    </div>
</div> 

<style>
    .route{
        width: 100%;
        font-size: 15px;
        font-weight: 300;
        background-color: var(--antiBodyBg);
        padding: 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        box-shadow: var(--boxShadow2);
    }
    .btn{
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 400;
        color: var(--buttonColor);
        fill: var(--buttonColor);
        background-color: var(--buttonBg);
        padding: 5px 10px;
        border-radius: 20px;
        margin: 0px 0 0px 20px;
        box-shadow: var(--boxShadow2);
        border: 1px solid transparent;
        transition: border 0.2s ease-in-out;
    }
    .btn.add{
        margin: 0 10px 0 0;
    }
    .name{
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 25px;
        font-weight: 300;
        color: var(--textColor);
        fill: var(--textColor);
        text-transform: capitalize;
    }
    .actions{
        display: flex;
        align-items: center;
    }
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
    .icon.objects{
        margin: 0 10px 0 0;
    }
</style>