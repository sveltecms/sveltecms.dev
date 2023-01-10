<script lang="ts">
    export let link: { title:string,href:string }
    import { page } from "$app/stores"
    $: routeID = $page.params['routeID']
    /** Indicate if current page is a route page or the routes page */
    $: isARoute = $page.url.pathname.includes("/admin/routes/") && ( $page.url.pathname.endsWith(`${routeID}/create`) || $page.url.pathname.endsWith(`${routeID}/update`))
    $: active = link.href===$page.url.pathname ? true : (isARoute && link.href.includes(`/admin/routes/${routeID}`))
</script>

<a data-sveltekit-preload-data href={link.href} class="link" class:active>
    {link.title}
</a>

<style>
    .link{
        font-size: 15px;
        font-weight: 400;
        color: var(--buttonColor);
        background-color: var(--buttonBg);
        padding: 5px 10px;
        border-radius: 20px;
        margin-right: 10px;
        box-shadow: var(--boxShadow2);
        border: 1px solid transparent;
        transition: border 0.2s ease-in-out;
    }
    .link.active,.link:hover{
        border: 1px solid #a3a1a1;
    }
</style>
