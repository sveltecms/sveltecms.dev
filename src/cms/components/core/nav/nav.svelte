<script lang="ts">
    import Logo from "./logo.svelte";
    import Links from "./links.svelte";
</script>
<header class="mainHeader">
    <nav class="mainNav">
        <Logo/>
        <Links />
    </nav>
</header>

<style lang="scss">
    .mainHeader{
        background-color: var(--navBg);
        color: var(--navLinkColor);
        border-right: 1px solid rgba(255,255,255,.1);
        width: min-content;
        position: sticky;
        top: 0; left: 0;
    }
    .mainNav{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    // Mobile
    @media(max-width:700px){
        .mainHeader{
            width: 70px;
        }
    }
</style>