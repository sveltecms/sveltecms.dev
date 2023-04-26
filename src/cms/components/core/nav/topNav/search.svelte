<script lang="ts">
    import { SEARCH } from "cms/lib/stores";
    import SearchIcon from "cms/icons/Search.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    $: cmsPath = $page.data.appData.config.cmsPath
    $: currentPathname = $page.url.pathname
    $: currentPathFolders = currentPathname.split("/")
    $: isObjects = ["/admin/routes/[routeID]","/admin/routes/[routeID]/new-object","/admin/routes/[routeID]/[objectID]"].includes(String($page.route.id))
    $: currentPathFolder = currentPathFolders.length > 2 ? isObjects ? "objects" : currentPathFolders[2] : currentPathFolders[1]
    $: searchTarget = currentPathFolder==="admin" ? "routes" : currentPathFolder==="settings" ? "routes" : currentPathFolder
    $: routeID = isObjects ? $page.data.routeData.ID : ""
    $: searchHref = isObjects ? `${cmsPath}/routes/${routeID}?q=${searchQuery}` : `${cmsPath}/${searchTarget}?q=${searchQuery}`
    $: placeholder = `Search ${searchTarget}...`
    $: searchQuery = $SEARCH.query
    /** Click search when click enter key */
    function handleInputClick(e:any){
        if(e.key==="Enter"){
            handleSearchClick()
        }
    }
    /** Go to search page */
    function handleSearchClick(){
        if(searchQuery.length>0) goto(searchHref,{ replaceState:false,keepFocus:true })
    }
</script>

<div class="searchWrap">
    <input type="text" class="searchInput" {placeholder} bind:value={$SEARCH.query} on:keypress={handleInputClick}>
    <div class="searchIcon" data-label="Search" on:click={handleSearchClick} on:keypress={handleSearchClick}>
        <SearchIcon/>
    </div>
</div>

<style lang="scss">
    .searchWrap{
        max-width: 500px;
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
    }
    .searchInput{
        width: 100%;
        border: none;
        border-radius: 5px;
        background-color: var(--antiBodyBg);
        color: #757575;
        padding: 10px;
        font-size: 17px;
        font-weight: 300;
        box-shadow: var(--boxShadow2);
        &:focus{ outline: none;}
    }
    .searchIcon{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 50%;
        position: absolute;
        right: 5px;
        fill: var(--iconColor);
    }
    // On mobile
    @media(max-width:700px){
        .searchInput{
            font-size: 15px;
        }
    }
</style>