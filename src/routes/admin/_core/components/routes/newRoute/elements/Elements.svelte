<script lang="ts">
    export let elements:ElementData[]
    import type { ElementData } from "$Types"
    import Element from "./Element.svelte";
    /** handle element deletion */
    function handleElementDelete(e:any){
        const element:ElementData = e.detail
        const newElements = elements.filter(data=>data.ID!==element.ID)
        elements = [...newElements]
    }
    /** handle element deletion */
    function handleElementMove(e:any){
        const element:ElementData = e.detail.element
        const direction:"up"|"down" = e.detail.direction
        // Find element index
        const elementIndex = elements.findIndex(data=>data.ID===element.ID)
        // If element index was founded and it's not index zero move up
        if(elementIndex!==-1 && direction==="up" && elementIndex!==0){
            elements[elementIndex] = elements[elementIndex-1]
            elements[elementIndex-1] = element
        }
        // If element index was founded and it's not the last index move down
        if(elementIndex!==-1 && direction==="down" && elementIndex<(elements.length-1)){
            elements[elementIndex] = elements[elementIndex+1]
            elements[elementIndex+1] = element
        }
    }
</script>

<div class="elements">
    {#each elements as element (element.ID)}
        {#if element.type!=="status"}
            <Element {element} on:delete={handleElementDelete} on:move={handleElementMove}/>  
        {/if}
    {/each}
</div>

<style>
    .elements{
        display: flex;
        flex-wrap: wrap;
    }
</style>