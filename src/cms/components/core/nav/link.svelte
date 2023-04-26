<script lang="ts">
    export let external:boolean = false
    export let icon:any
    export let href:string
    export let text:string
    import { page } from "$app/stores"
    import { SEARCH } from "cms/lib/stores"
    /** Handle link click */
    function handleLinkClick(){
        SEARCH.update(data=>{
            data.query = ""
            data.fetching = false
            return data
        })
    }
    $: cmsPath = $page.data.appData.config.cmsPath
    $: currentPathname = $page.url.pathname
    $: currentPathnameParams = currentPathname.split("/").slice(1)
    $: currentParentPath = currentPathnameParams.length===1 ? currentPathnameParams[0] : currentPathnameParams[1]
    $: pathname = cmsPath+href
    $: pathnameParams = pathname.split("/").slice(1)
    $: pathnameParentPath = pathnameParams.length===1 ? pathnameParams[0] : pathnameParams[1]
    $: active = currentParentPath === pathnameParentPath
    const attributes:any = { "data-label-right":"", "data-label":text }
    if(external){
        attributes['target'] = "_blank"
        attributes['rel'] = "noreferrer"
    }
</script>

<a href={external?href:cmsPath+href} {...attributes} data-sveltekit-preload-data class="link" class:active on:click={handleLinkClick}>
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
        width: inherit;
        &.active,&:hover{ background-color: var(--navLinkHoverBg); }
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
    }
    // On mobile
    @media(max-width:700px){
        .icon{
            margin: 0 0 5px 0;
        }
        .link{
            font-size: 12px;
            font-weight: 300;
            flex-direction: column;
        }
    }
</style>