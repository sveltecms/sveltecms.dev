<script lang="ts">
    export let data:PageData
    import type { PageData } from "./$types";
    import PageTitle from "cms/components/shared/PageTitle.svelte";
    import Stats from "cms/components/shared/stats/Stats.svelte";
    import Assets from "cms/components/shared/assets/assets.svelte";
    import Users from "cms/components/shared/users/users.svelte";
    import Routes from "cms/components/shared/routes/Routes.svelte";
    import MetaData from "cms/components/shared/MetaData.svelte";
    $: stats = data.stats
    $: assets = data.assets
    $: users = data.users
    $: routes = data.routes
</script>

<MetaData />
<PageTitle title="Site stats" />
<Stats {stats}/>
<PageTitle title="Latest routes" link={{ text:"View more",href:"/routes"}}/>
<Routes {routes} showDel={false}/>
<PageTitle title="Latest assets" link={{ text:"View more",href:"/assets"}}/>
<Assets {assets}/>
<PageTitle title="Latest users" link={{ text:"View more",href:"/users"}}/>
<Users {users} showDel={false}/>