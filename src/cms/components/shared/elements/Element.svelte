<script lang="ts">
    export let element:ElementData
    import type { ElementData } from "cms/types"
    import { createEventDispatcher } from "svelte";
    // Icons
    import DragIcon from "cms/icons/GripHorizontal.svelte"
    import TrashIcon from "cms/icons/Trash.svelte";
    import XIcon from "cms/icons/X.svelte";
    // components
    import Confirm from "cms/components/shared/Confirm.svelte"
    const dispatch = createEventDispatcher()
    let showConfirm:boolean = false
    const typeText = element.type==="input" ? "🔏" : element.type==="textArea" ? "💬"
    : element.type==="content" ? "📝" : element.type==="slug" ? "🔗" : element.type==="dateTime" ? "🗓️"
    : element.type==="asset" ? "🏞️" : element.type==="inputNumber" ? "💯" : element.type==="assets" ? "🏞️" : element.type==="linkToRoute" ? "🔗" : element.type==="boolean" ? "✨" : "💬"

    /** Hide or show confirmation popUp */
    function handleShow(){ showConfirm=!showConfirm }
</script>

<div class="element">
    <div class="icon drag">
        <DragIcon size=15/>
    </div>
    <span class="title">
        {typeText}  {element.title}
    </span>
    <div class="icon trash" data-label-left data-label="Remove {element.ID}" on:click={handleShow} on:keypress={handleShow}>
        {#if showConfirm}
            <Confirm on:confirm={(e)=>{if(e.detail){ dispatch("delete",element) }}} top/>
            <XIcon size=15/>
        {:else}
            <TrashIcon size=15/>
        {/if}
    </div>
</div> 

<style lang="scss">
    .element{
        width: 100%;
        font-size: 15px;
        font-weight: 300;
        background-color: #2e323a6b;
        padding: 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        box-shadow: var(--boxShadow2);
    }
    .icon{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--iconColor);
        background-color: rgba(0,0,0,.2);
        padding: 5px;
        border-radius: 3px;
        &.trash{
            fill: #ac5e5e;
            margin-left: 15px;
        }
        &.drag{
            cursor: grab;
            margin-right: 15px;
        }
    }
    .title{
        flex: 1;
        font-size: 16px;
        font-weight: 400;
        color: var(--textColor);
    }
    @media(max-width:700px){
        .title{ text-align: center; }
    }
</style>