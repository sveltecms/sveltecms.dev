<script lang="ts">
    import { ROUTES } from "$Stores";
    import NoResult from "$Comps/NoResult.svelte";
    $: defaultRouteLink = $ROUTES.length > 0 ? $ROUTES[0].ID : false
</script>

{#if defaultRouteLink}
    <NoResult title="Nothing to see here" subTitle="Views {defaultRouteLink}'s objects" href="/admin/objects/{defaultRouteLink}" hrefText="View"/>
{:else}
    <NoResult title="No routes founded" subTitle="Please add some routes" href="/admin/routes/create" hrefText="Create"/>
{/if}