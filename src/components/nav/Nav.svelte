<script>
    import Logo from "./Logo.svelte";
    import Links from "./Links.svelte";
    import SocialMedias from "./SocialMedias.svelte";
</script>

<header class="mainHeader">
    <nav class="mainNav">
        <Logo />
        <Links />
        <SocialMedias />
    </nav>
</header>

<style>
    .mainHeader{
        position: sticky;
        top: 0px;
        display: flex;
        background-color: var(--navBg);
        color: var(--navColor);;
        box-shadow: 0 2px 4px rgba(0,0,0,.2);
        padding: 15px 0;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    .mainNav{
        max-width: 1200px;
        width: 95%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>