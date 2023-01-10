<script lang="ts">
    /** Indicate if box is open or close */
    export let open:boolean
    /** PopUpBox content max with*/
    export let maxWidth:string = "400px"
    /** PopUpBox content max with*/
    export let maxHeight:string = "700px"
    import CloseIcon from "$Icons/Close.svelte"
    import { createEventDispatcher } from "svelte";
    /** Close box */
    function handleBoxClick(e:Event){
        const element = e.target as HTMLDivElement
        const canClose = ( element.classList.contains("closeBtn") || element.classList.contains("popUpBox") )
        if(canClose){ open = false }
        // Create custom event when box is closed
        if(open===false) dispatch("close")
    }
    // Variables
    const dispatch = createEventDispatcher()
</script>

{#if open}
<div class="popUpBox" on:click={handleBoxClick}>
    <div class="content" style="--maxWidth:{maxWidth};--maxHeight:{maxHeight}">
        <div class="closeBtn" on:click={handleBoxClick}>
            <CloseIcon />
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
        background-color: rgba(0,0,0,.6);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content{
        max-width: var(--maxWidth);
        max-height: var(--maxHeight);
        width: 95%;
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