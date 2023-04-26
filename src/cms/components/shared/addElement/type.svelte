<script lang="ts">
    export let type:{ title:string,key:ElementType }
    export let value:string
    import type { ElementType } from "cms/types"
    $:active = type.key === value

    /** Handle delete button click */
    function handleClick(){
        value = type.key
    }
</script>

<div class="type" class:active on:click={handleClick} on:keypress={handleClick}>
    {type.title}
</div>  

<style>
    .type{
        cursor: pointer;
        flex-grow: 1;
        text-align: center;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        padding: 8px;
        border-radius: 2px;
        font-size: 13px;
        font-weight: 400;
        box-shadow: var(--boxShadow2);
        width: calc(100% / 4 - 8px);
    }
    .type:hover,.type.active{
        background-color: var(--buttonBg2);
    }
</style>