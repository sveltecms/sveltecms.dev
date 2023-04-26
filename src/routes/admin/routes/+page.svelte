<script lang="ts">
    export let data: PageData;
    import type { PageData } from './$types';
    import type { RouteData } from 'cms/types';
    import type { DeleteRouteFunc } from 'cms/funcs';
    import Utils from "cms/utils"
    import MetaData from "cms/components/shared/MetaData.svelte";
    import PageTitle from 'cms/components/shared/PageTitle.svelte';
    import Routes from 'cms/components/shared/routes/Routes.svelte';
    import NoResult from "cms/components/shared/NoResult.svelte"
    import Pagination from "cms/components/shared/Pagination.svelte";
    import { addToast } from 'cms/packages/toasts';
    $: routes = data.routes

    /** delete route */
    async function deleteRoute(e:any){
        const route:RouteData = e.detail
        const apiLoad:DeleteRouteFunc['input'] = { name:"deleteRoute",data:route }
        const apiResponse:DeleteRouteFunc['output'] = await Utils.fetch("/",apiLoad)
        // If route was deleted
        if(apiResponse.ok){
            const newRoutesList = routes.filter(data=>data.ID!==route.ID)
            routes = [...newRoutesList]
            addToast({ type:"ok",msg:apiResponse.msg })
        }
        // If route was not deleted
        else addToast({ type:"error",msg:apiResponse.msg })
    }
</script>

<MetaData title="Routes"/>
<PageTitle title="Routes" link={{ href:"/routes/create",text:"Create route"}}/>
<Routes {routes} on:delete={deleteRoute}/>
{#if routes.length===0}
    <NoResult title="No routes founded" subTitle="Please create new route to be displayed here" hrefText="Create route" href="/routes/create"/>
{/if}
<Pagination baseDir="routes" itemsCount={data.count} page={data.page} itemsPerPage={data.itemsPerPage}/>