<script lang="ts">
    export let route:RouteData
    export let showDel:boolean = true
    import type { RouteData } from "cms/types"
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import { page } from "$app/stores"
    // Components
    import Confirm from "cms/components/shared/Confirm.svelte";
    // Icons
    import PlusIcon from "cms/icons/Plus.svelte";
    import TrashIcon from "cms/icons/Trash.svelte";
    import CloseIcon from "cms/icons/X.svelte"
    import PenIcon from "cms/icons/VectorPen.svelte"
    import ViewIcon from "cms/icons/Eye.svelte"
    // Variables
    const dispatcher = createEventDispatcher()
    let showConfirm:boolean = false
    $: appData = $page.data.appData
    $: cmsPath = appData.config.cmsPath
    $: viewObjectsHref = `${cmsPath}/routes/${route.ID}`
    $: editHref = `${cmsPath}/routes/${route.ID}/update`
    $: addObjectHref = `${cmsPath}/routes/${route.ID}/new-object`
</script>

<div class="route" in:fade>
    <a href={viewObjectsHref} class="icon objects" data-label="View {route.ID}" data-sveltekit-preload-data>
        <ViewIcon />
    </a>
    <a href={addObjectHref} class="btn add" data-sveltekit-preload-data>
        <PlusIcon />Add object
    </a>
    <span class="name">{route.title}</span>
    <div class="actions">
        <a href={editHref} class="icon" data-label="Edit {route.ID}" data-sveltekit-preload-data>
            <PenIcon />
        </a>
        {#if showDel}
            <div class="icon trash" data-label="Delete" on:click={()=>showConfirm=!showConfirm} on:keypress={()=>showConfirm=!showConfirm}>
                {#if showConfirm}
                    <Confirm on:confirm={(e)=>{ if(e.detail)dispatcher("delete",route) }} /> 
                    <CloseIcon />
                {:else}
                    <TrashIcon />
                {/if}
            </div>
        {/if}
    </div>
</div> 

<style lang="scss">
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
        gap: 15px;
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
        box-shadow: var(--boxShadow2);
        border: 1px solid transparent;
        transition: border 0.2s ease-in-out;
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
        gap: 10px;
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
    }
    .icon.trash{
        background-color: #906565;
    }
    // Mobile
    @media(max-width:700px){
        .route{ gap: 5px; }
        .actions{ gap: 5px; }
        .name{ font-size: 20px; }
    }
</style>