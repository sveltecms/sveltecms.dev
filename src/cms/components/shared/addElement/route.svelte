<script lang="ts">
    import { fade } from "svelte/transition";
    export let ID:string
    export let currentID:string
    $:active = currentID === ID
    /** Handle delete button click */
    function handleClick(){
        currentID = ID
    }
</script>

<div class="type" in:fade class:active on:click={handleClick} on:keypress={handleClick}>
    {ID}
</div>  

<style>
    .type{
        cursor: pointer;
        flex-grow: 1;
        text-align: center;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        padding: 8px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 400;
        box-shadow: var(--boxShadow2);
        width: calc(100% / 4 - 8px);
    }
    .type:hover,.type.active{
        background-color: var(--buttonBg2);
    }
</style>