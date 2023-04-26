<script lang="ts">
    import"cms/static/cms.css"
    import MainNav from "cms/components/core/nav/nav.svelte"
    import TopNav from "cms/components/core/nav/topNav/topNav.svelte"
    import MainFooter from "cms/components/core/footer/footer.svelte"
    import Toasts from "cms/packages/toasts/Toasts.svelte"
</script>

<Toasts />
<div class="cms">
    <MainNav />
    <div class="cmsContent">
        <TopNav />
        <main>
            <slot />
        </main>
        <MainFooter />
    </div>
</div>

<style lang="scss">
    .cms{
        background-color: var(--bodyBg);
        height: 100dvh;
        display: flex;
        overflow-y:auto;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .cmsContent{
        width: 100%;
    }
    main{
        padding: 10px;
    }
</style>