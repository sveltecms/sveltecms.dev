<script lang="ts">
    // Components
    import Link from "./link.svelte"
    // Icons
    import HomeIcon from "cms/icons/House.svelte"
    import RoutesIcon from "cms/icons/Diagram3.svelte"
    import UsersIcon from "cms/icons/People.svelte"
    import AssetsIcon from "cms/icons/Images.svelte"
    import SettingsIcon from "cms/icons/Gear.svelte"
    import DisplayIcon from "cms/icons/Display.svelte"
</script>

<ul class="links">
    <Link text="Home" href="" icon={HomeIcon}/>
    <Link text="Routes" href="/routes" icon={RoutesIcon}/>
    <Link text="users" href="/users" icon={UsersIcon}/>
    <Link text="Assets" href="/assets" icon={AssetsIcon}/>
    <Link text="Settings" href="/settings" icon={SettingsIcon}/>
    <Link text="Preview" href="/" icon={DisplayIcon} external={true}/>
</ul>

<style lang="scss">
    .links{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    // On mobile
    @media(max-width:700px){
        .links{
            align-items: center;
        }
    }
</style>