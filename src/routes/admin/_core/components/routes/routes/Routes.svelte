<script lang="ts">
    const API_PATH = "/admin/api/routes"
    export let routes:RouteData[]
    import type { RouteData, ApiRouteDeleteLoad, ApiRouteDeleteData } from "$Types"
    import { fetchPost } from "$Utilities";
    import { newToast } from "@anthony809/svelte-toasts/index";
    import { ROUTES } from "$Stores"
    import Route from "./Route.svelte";
    /** handle route deletion */
    async function handleRouteDelete(e:any){
        const route:RouteData = e.detail
        // Delete in database
        const apiData:ApiRouteDeleteLoad = route
        const apiResponse:ApiRouteDeleteData = await fetchPost("DELETE",API_PATH,apiData)
        // If route was deleted
        if(apiResponse.ok){
            const newRoutes = routes.filter(data=>data.ID!==route.ID)
            ROUTES.set(newRoutes)
            newToast({type:"ok",msg:apiResponse.msg})
        } 
        // If route was not deleted
        else newToast({type:"error",msg:apiResponse.msg})
    }
</script>

<div class="routes">
    {#each routes as route (route.ID)}
        <Route {route} on:delete={handleRouteDelete}/>
    {/each}
</div>

<style>
    .routes{
        display: flex;
        flex-wrap: wrap;
    }
</style>