<script lang="ts">
    export let loading:boolean
    import Spinner from "./spinner.svelte"
</script>

<button type="submit" class:loading disabled={loading} on:click|preventDefault>
    {#if loading}
        <Spinner size=13 />
    {/if}
    Login
</button>

<style lang="scss">
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 100%;
        border: none;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        color: var(--buttonColor);
        background-color: var(--buttonBg);
        transition: scale ease-in-out 0.2s;
        box-shadow: 1px 2px 4px rgba(0,0,0,.3);
        &:focus,&:hover{
            outline: none;
            scale: 1.02;
        }
    }
    .loading{
        cursor: not-allowed;
        opacity: 80%;
    }   
</style>