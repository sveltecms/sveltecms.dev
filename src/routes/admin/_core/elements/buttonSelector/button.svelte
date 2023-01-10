<script lang="ts">
    export let data:string
    export let currentValue:string
    import { createEventDispatcher } from "svelte"
    /** Handle button click and send dispatcher */
    function handleClick(){
        currentValue = data
        dispatch("select",data)
    }
    // Variables
    const dispatch = createEventDispatcher()
    $: active = currentValue===data
</script>

<button class="button" class:active on:click={handleClick}>
    {data}
</button>

<style>
    .button{
        cursor: pointer;
        flex-grow: 1;
        font-size: 15px;
        font-weight: 600;
        color: var(--buttonColor);
        background-color: var(--buttonBg);
        padding: 5px 10px;
        border-radius: 20px;
        box-shadow: var(--boxShadow2);
        border: 1px solid transparent;
        transition: background-color 0.2s ease-in-out;
        text-transform: uppercase;
    }
    .button.active,.button:hover{
        background-color: var(--buttonBg2);
        border: 1px solid #ffffff2e;
    }
</style>
