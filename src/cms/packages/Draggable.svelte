<script lang="ts">
    export let id:string|number
    import { createEventDispatcher  } from "svelte";

    function dragStart(e:any){
        // Add none event pointer for elements in child div      
        const children = document.querySelectorAll(".draggableChild .child")
        children.forEach((child:any)=>{ child.style["pointer-events"] = "none" })
        e.dataTransfer.setData('id', id);
    }

    function dragEnter(e:any){
        const itemElement:HTMLDivElement = e.target
        itemElement.classList.add("active") // add active class
    }

    function dragLeave(e:any){
        const itemElement:HTMLDivElement = e.target
        itemElement.classList.remove("active") // remove active class
    }

    function dragDrop(e:any){
        const itemElement:HTMLDivElement = e.target
        // remove none event pointer for elements in child div      
        const children = document.querySelectorAll(".draggableChild .child")
        children.forEach((child:any)=>{ child.style["pointer-events"] = "auto" })
        // remove active class
        itemElement.classList.remove("active")
        const fromID = e.dataTransfer.getData('id')
        const toID = id
        // Send custom event
        if(fromID!==toID) dispatch("change",{ fromID,toID })
    }

    const dispatch = createEventDispatcher()
    let active:boolean = false
</script>

<div class="draggableChild" class:active draggable="true" on:dragstart={dragStart} on:dragenter={dragEnter} on:dragleave={dragLeave} on:dragover|preventDefault|stopPropagation on:drop={dragDrop}>
    <div class="child">
        <slot />
    </div>
</div>

<style lang="scss">
    .draggableChild{
        margin: var(--margin);
        width: calc(100% / var(--count) - calc(var(--margin) * 2));
        border-radius: var(--br);
        cursor: pointer;
        background-color: var(--bg);
        transition: opacity ease 0.3s , transform ease-in-out 0.3s;
        position: relative;
    }
    .draggableChild.active{
        opacity: 40%;
        transform: scale(1.01);
    }
    .child {
        display: contents;
    }
</style>