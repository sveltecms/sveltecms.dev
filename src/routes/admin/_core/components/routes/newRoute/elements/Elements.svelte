<script lang="ts">
    export let elements:ElementData[]
    import type { ElementData } from "$Types"
    import Element from "./Element.svelte";
    import Draggable from "@anthony809/svelte-draggable";
    import DraggableChild from "@anthony809/svelte-draggable/DraggableChild.svelte";
    import draggableConfig from "@anthony809/svelte-draggable/config"
    import { onDestroy } from "svelte";
    const draggableConfigDefault = { ...$draggableConfig }
    // Set draggable config
    draggableConfig.update(data=>{ data.count="1" ; data.margin="0px 0px 10px 0px" ; data.bg="transparent" ;  return data })
    // Reset draggable config
    onDestroy(()=>draggableConfig.set(draggableConfigDefault))
    
    /** handle element deletion */
    function handleElementDelete(e:any){
        const elementID:string = e.detail
        const newElementsList = elements.filter(data=>data.ID!==elementID)
        elements = [...newElementsList]
    }

    /** handle element deletion */
    function handleElementMove(e:any){
        const detailData:{fromID:string,toID:string} = e.detail
        const newElementsList = swapIndex(elements,detailData.fromID,detailData.toID)
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

<Draggable>
    {#each elements as element (element.ID)}
        <DraggableChild id={element.ID} on:dropEnded={handleElementMove} on:remove={handleElementDelete}>
            <Element {element}/>  
        </DraggableChild>
    {/each} 
</Draggable>