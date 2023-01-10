<script lang="ts">
    export let tag:TagData|TagLoad
    export let active:boolean = false
    import type { TagData,TagLoad } from "$Types"
    import CheckMarkIcon from "$Icons/CheckMark.svelte";
    import { createEventDispatcher } from "svelte"
    const dispatch = createEventDispatcher()
</script>

<div class="item" class:active on:click={()=>dispatch("click",tag)}>
    {tag.name}
    {#if active}
        <div class="icon">
            <CheckMarkIcon size=13/>
        </div>
    {/if}
</div>

<style>
    .item{
        cursor: pointer;
        width: 100%;
        padding: 8px 10px;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        fill: var(--buttonColor);
        border-radius: 5px;
        font-size: 14px;
        font-weight: 300;
        text-transform: capitalize;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color ease 0.3s;
        margin-bottom: 5px;
    }
    .icon{
        padding: 3px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        background-color: rgba(0,0,0,.2);
    }
    .item:hover{
        background-color: var(--buttonBg2);
    }
    .item.active{
        border-radius: 50px;
        background-color: rgba(0,0,0,15%);
        width: calc(100% / 2 - 5px);
        margin-bottom: 0px;
    }
</style>