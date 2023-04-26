<script lang="ts">
    export let loading:boolean
    import Spinner from "$Comps/Spinner.svelte";
</script>

<div class="wrap">
    <button on:click class:loading disabled={loading}>
        {#if loading}<Spinner />{/if}
        Load More
    </button>
</div>

<style lang="scss">
    .wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0px;
    }
    button{
        display: flex;
        align-items: center;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        cursor: pointer;
        border: none;
        border-radius: 50px;
        padding: 10px 15px;
        font-size: 13px;
        font-weight: 600;
        transition: transform ease-in-out 0.3s;
        // on hover
        &:hover{ transform: scale(1.05) }
    }
    button.loading{
        cursor: not-allowed;
        opacity: 80%;
    }
</style>