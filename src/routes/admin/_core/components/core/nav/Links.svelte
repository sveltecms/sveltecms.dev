<script lang="ts">
    import { ROUTES } from "$Stores"
    // Components
    import Link from "./Link.svelte"
    import ExternalLink from "./ExternalLink.svelte"
    // Icons
    import HomeIcon from "$Icons/House.svelte"
    import RoutesIcon from "$Icons/Diagram3.svelte"
    import TagsIcon from "$Icons/Tags.svelte"
    import CategoriesIcon from "$Icons/Tags.svelte"
    import UsersIcon from "$Icons/People.svelte"
    import AssetsIcon from "$Icons/Images.svelte"
    import SettingsIcon from "$Icons/Gear.svelte"
    // import SettingsIcon from "$Icons/Gear.svelte"
    import DisplayIcon from "$Icons/Display.svelte"
    $: routesWithCategories = $ROUTES.filter(route=>route.includeCategories==="yes")
    $: routesWithTags = $ROUTES.filter(route=>route.includeTags==="yes")
    /** If any routes includes categories, use one of the as the default categories link */
    $: categoriesLink = routesWithCategories.length>0 ? `/admin/categories/${routesWithCategories[0].ID}` : "/admin/categories"
    /** If any routes includes tags, use one of the as the default tags link */
    $: tagsLink = routesWithTags.length>0 ? `/admin/tags/${routesWithTags[0].ID}` : "/admin/tags"
</script>

<ul class="links">
    <Link text="Home" href="/admin" icon={HomeIcon}/>
    <Link text="Routes" href="/admin/routes" icon={RoutesIcon}/>
    <Link text="Categories" href={categoriesLink} icon={CategoriesIcon}/>
    <Link text="Tags" href={tagsLink} icon={TagsIcon}/>
    <Link text="users" href="/admin/users" icon={UsersIcon}/>
    <Link text="Assets" href="/admin/assets" icon={AssetsIcon}/>
    <Link text="Settings" href="/admin/settings" icon={SettingsIcon}/>
    <ExternalLink text="Preview" href="/" icon={DisplayIcon}/>
</ul>

<style>
    .links{
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }
</style>