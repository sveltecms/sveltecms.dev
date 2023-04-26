<script lang="ts">
    import"cms/static/cms.css"
    // packages
    import Toasts from "cms/packages/toasts/Toasts.svelte";
</script>

<Toasts />
<div class="cms">
    <slot />
</div>

<style lang="scss">
    .cms{
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: var(--bodyBg);
    }
</style>