<script lang="ts">
    export let data:PageServerData
    ASSETS.set(data.assets)
    USERS.set(data.users)
    ROUTES.set(data.routes)
    import type { PageServerData } from "./$types"
    import { ROUTES,USERS,ASSETS } from "$Stores"
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    import PageTitle from "$Comps/PageTitle.svelte";
    import PageTitleLink from "$Comps/PageTitleLink.svelte";
    import NoResult from "$Comps/NoResult.svelte";
    import Stats from "$Comps/shared/stats/Stats.svelte";
    import Users from "$Comps/users/Users.svelte";
    import Routes from "$Comps/routes/routes/Routes.svelte";
    import Assets from "$Comps/shared/assets/Assets.svelte";
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Home",
        description:svelteCMS.site.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
<PageTitle title="Website stats"/>
<Stats stats={data.stats}/>

{#if $ROUTES.length > 0}
    <PageTitleLink title="Latest routes" href="/admin/routes" linkText="View routes"/>
    <Routes routes={$ROUTES}/>
{:else}
    <NoResult title="No routes" subTitle="" href="/admin/routes/create" hrefText="Create new route"/>
{/if}

{#if $USERS.length > 0}
    <PageTitleLink title="Latest users" href="/admin/users" linkText="View users"/>
    <Users users={$USERS}/>
{:else}
    <NoResult title="No users" subTitle="" href="/admin/users/create" hrefText="Create user"/>
{/if}

{#if $ASSETS.length > 0}
    <PageTitleLink title="Latest assets" href="/admin/assets" linkText="View assets"/>
    <Assets assets={$ASSETS}/>
{:else}
    <NoResult title="No assets" subTitle="" href="/admin/assets" hrefText="Add assets"/>
{/if}