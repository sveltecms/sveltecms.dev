<script lang="ts">
    export let title:string
    export let icon:any|undefined = undefined
</script>

<button on:click>
    {#if icon} <svelte:component this={icon}/> {/if}
    {title}
</button>

<style>
    button{
        width: fit-content;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 300;
        color: var(--buttonColor);
        background-color: var(--buttonBg);
        box-shadow: 1px 1px 4px rgba(0,0,0,.1);
    }
</style>