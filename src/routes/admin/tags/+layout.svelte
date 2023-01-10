<script>
    import { ROUTES } from "$Stores"
    import { capitalize } from "$Utilities";
    import InPageLinks from "$Comps/shared/inPageLink/Links.svelte"
    $: routesWithTags = $ROUTES.filter(route=>route.includeTags==="yes")
    $: links = routesWithTags.map(route=>{ return{ title:capitalize(route.title),href:`/admin/tags/${route.ID}`} })
</script>

<div class="page">
    <InPageLinks {links}/>
    <!-- Page content -->
    <slot />
</div>

<style>
    .page{
        color: var(--textColor);
        margin-bottom: 10px;
    }
</style>