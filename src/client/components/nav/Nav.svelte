<script>
    import Logo from "./Logo.svelte";
    import Links from "./Links.svelte";
    import SocialMedias from "./SocialMedias.svelte";
    import Search from "./Search.svelte";
    import ToggleSwitch from "./ToggleSwitch.svelte";
</script>

<header>
    <nav>
        <Logo />
        <Search />
        <Links />
        <SocialMedias />
        <ToggleSwitch checked/>
    </nav>
</header>

<style>
    header {
        position: sticky;
        top: 0px;
        display: flex;
        align-items: center;
        background-color: var(--navBg);
        color: var(--navColor);;
        box-shadow: 0 2px 4px rgba(0,0,0,.1);
        padding: 15px 0;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 1;
    }
    nav {
        max-width: 1200px;
        width: 95%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>