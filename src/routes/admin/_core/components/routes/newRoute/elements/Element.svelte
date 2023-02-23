<script lang="ts">
    export let element:ElementData
    import type { ElementData } from "$Types"
    // Icons
    import DragIcon from "$Icons/GripHorizontal.svelte"
    const typeText = element.type==="input" ? "🔏" : element.type==="textArea" ? "💬"
    : element.type==="content" ? "📝" : element.type==="slug" ? "🔗" : element.type==="dateTime" ? "🗓️"
    : element.type==="image" ? "🏞️" : element.type==="inputNumber" ? "💯" : element.type==="images" ? "🏞️" : "💬"
</script>

<div class="element">
    <div class="drag">
        <DragIcon size=20/>
    </div>
    <span class="title">
        {typeText}  {element.name}
    </span>
</div> 

<style>
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
    .drag{
        fill: var(--iconColor);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,.2);
        padding: 7px;
        border-radius: 50%;
        margin-right: 20px;
    }
    .title{
        flex: 1;
        font-size: 18px;
        font-weight: 400;
        color: var(--textColor);
    }
</style>