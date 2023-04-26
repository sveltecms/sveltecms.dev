<script lang="ts">
    export let open:boolean
    export let maxWidth:string = "400px"
    export let maxHeight:string = "700px"
    export let height:string = "auto"
    import { createEventDispatcher } from "svelte"
    // icons
    import XIcon from "cms/icons/X.svelte"
    const dispatch = createEventDispatcher()
    /** Close box */
    function handleBoxClick(e:Event){
        const element = e.target as HTMLDivElement
        const canClose = ( element.classList.contains("closeBtn") || element.classList.contains("popUpBox") )
        if(canClose){ open = false }
        // Create custom event when box is closed
        if(open===false) dispatch("close")
    }
    // Variables
</script>

{#if open}
<div class="popUpBox" on:click={handleBoxClick} on:keypress={handleBoxClick} on:keydown>
    <div class="content" style="--maxWidth:{maxWidth};--maxHeight:{maxHeight};--height:{height}">
        <div class="closeBtn" on:click={handleBoxClick} on:keypress={handleBoxClick}>
            <XIcon />
        </div>
        <slot />
    </div>
</div>
{/if}

<style>
    .popUpBox{
        z-index: 100;
        position: fixed;
        top: 0; left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,.8);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content{
        max-width: var(--maxWidth);
        max-height: var(--maxHeight);
        width: 90%;
        height: var(--height);
        background-color: var(--bodyBg);
        color: var(--textColor);
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-radius: 5px;
        position: relative;
    }
    .closeBtn{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -16px;
        right: -16px;
        background-color: var(--buttonBg);
        padding: 10px;
        border-radius: 50%;
        fill: var(--buttonColor);
        box-shadow: 0 0 4px rgba(0,0,0,.2);
    }
    .closeBtn:global(.closeBtn svg){
        pointer-events: none;
    }
</style>