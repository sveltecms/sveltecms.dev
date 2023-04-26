<script lang="ts">
    export let routes:RouteData[]
    export let showDel:boolean = true
    import type { RouteData } from "cms/types"
    import Route from "./Route.svelte";
</script>

<div class="routes">
    {#each routes as route (route.ID)}
        <Route {showDel} {route} on:delete/>
    {/each}
</div>

<style>
    .routes{
        display: flex;
        flex-wrap: wrap;
    }
</style>