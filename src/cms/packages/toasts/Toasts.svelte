<script lang="ts">
    import Toast from "./Toast.svelte";
    import { TOASTS } from "./index";
</script>

{#if $TOASTS.length > 0}
    <div class="toasts">
        {#each $TOASTS as toast (toast.id)}
            <Toast {toast}/>
        {/each}
    </div>
{/if}

<style>
    .toasts{
        z-index: 10000;
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>