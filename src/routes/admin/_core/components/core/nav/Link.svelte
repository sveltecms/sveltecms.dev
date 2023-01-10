<script lang="ts">
    export let icon:any
    export let href:string
    export let text:string
    import { page } from "$app/stores"
    import { IS_NAV_OPEN } from "$Stores"
    $: currentPathname = $page.url.pathname
    $: isACategory = currentPathname.includes("/admin/categories")
    $: isATag = currentPathname.includes("/admin/tags")
    $: isUsersRoute = currentPathname.includes("/admin/users")
    /** Indicate if current page is a route page or the routes page */
    $: isARoute = currentPathname.includes("/admin/routes") || currentPathname.includes("/admin/objects")
    /** Indicate if current page is a setting page or the settings page */
    $: isSetting = currentPathname.includes("/admin/settings")
    $: active = (isSetting && href.includes("/admin/settings")) ? true : (isARoute && href.includes("/admin/routes")) ? true : (isACategory && href.includes("/admin/categories")) ? true : (isATag && href.includes("/admin/tags")) ? true : (isUsersRoute && href.includes("/admin/users")) ? true : href===currentPathname
    const attributes = { "data-label-right":"", "data-label":text }
</script>

<a {href} {...attributes} data-sveltekit-preload-data class="link" class:active on:click={()=>IS_NAV_OPEN.set(false)}>
    <div class="icon">
        <svelte:component this={icon}/>
    </div>
    <span class="title">{text}</span>
</a>

<style lang="scss">
    .link{
        display: flex;
        align-items: center;
        padding: 10px 20px;
        margin-bottom: 10px;
        color: var(--navLinkColor);
        fill: var(--navLinkColor);
        font-size: 15px;
        font-weight: 300;
        position: relative;
        &.active,&:hover{ background-color: var(--navLinkHoverBg); }
        &.active::after,&:hover::after{
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            height: 100%;
            width: 3px;
            background-color: var(--mainColor);
        }
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
    }
</style>