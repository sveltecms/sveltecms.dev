<script lang="ts">
    export let elements:ElementData[]
    import type { ElementData } from "cms/types"
    import Element from "./Element.svelte";
    import Draggable from "cms/packages/Draggable.svelte";
    
    /** Delete element */
    function deleteElement(e:any){
        const element:ElementData = e.detail
        const newElementsList = elements.filter(data=>data.ID!==element.ID)
        elements = [...newElementsList]
    }

    /** Move elements order */
    function changeElementsOrder(e:any){
        const {fromID,toID} = e.detail as {fromID:string,toID:string}
        const newElementsList = swapIndex(elements,fromID,toID)
        elements = [...newElementsList]
    }

    function swapIndex(list:any[],idOne:string,idTwo:string){
        const idOneData = list.find(data=>data.ID===idOne)
        const idOneIndex = list.findIndex(data=>data.ID===idOne)
        const idTwoIndex = list.findIndex(data=>data.ID===idTwo)
        list[idOneIndex] = list[idTwoIndex]
        list[idTwoIndex] = idOneData
        return list
    }
</script>

<div class="elements">
    {#each elements as element}
        <Draggable id={element.ID} on:change={changeElementsOrder}>
            <Element {element} on:delete={deleteElement}/> 
        </Draggable>
    {/each}
</div>

<style>
    .elements{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 15px;
    }
</style>