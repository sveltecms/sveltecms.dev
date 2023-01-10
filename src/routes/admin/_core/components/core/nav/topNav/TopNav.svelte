<script lang="ts">
    import { IS_NAV_OPEN } from "$Stores";
    import Logo from "./Logo.svelte"
    import Search from "./Search.svelte";
    import ProfileImage from "./ProfileImage.svelte";
    import BurgerButton from "$Comps/BurgerButton.svelte";
</script>

<header class="secondHeader">
    <Logo />
    <Search />
    <div class="rightMenu">
        <ProfileImage />
        <BurgerButton bind:open={$IS_NAV_OPEN}/>
    </div>
</header>

<style>
    .secondHeader{
        position: sticky;
        top: 0;
        z-index: 6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(33 37 45);
        box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
        padding: 10px;
    }
    .rightMenu{
        display: flex;
        align-items: center;
    }
</style>