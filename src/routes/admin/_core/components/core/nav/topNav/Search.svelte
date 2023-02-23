<script lang="ts">
    import { SEARCH } from "$Stores";
    import SearchIcon from "$Icons/Search.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    $: routeData = $page.route.id?.split("/admin")[1].trim() as String
    $: routeID = routeData.includes("[") ? routeData.split("/")[1].split("/[")[0] : routeData ? routeData.split("/")[1] : "routes"
    $: placeholder = `Search ${routeID}...`
    $: searchQuery = $SEARCH.query
    /** Click search when click enter key */
    function handleInputClick(e:any){
        if(e.key==="Enter"){
            handleSearchClick()
        }
    }
    /** Go to search page */
    function handleSearchClick(){
        if(routeID==="assets" && $SEARCH.query.trim()){
            goto(`/admin/assets?q=${searchQuery}`,{ replaceState:false,keepFocus:true })
        }
        else if(routeID==="routes" && $SEARCH.query.trim()){
            goto(`/admin/routes?q=${searchQuery}`,{ replaceState:false,keepFocus:true })
        }
        else if(routeID==="objects" && $SEARCH.query.trim()){
            const objectsRouteID = $page.url.pathname.split("/").splice(-1)[0].trim()
            goto(`/admin/objects/${objectsRouteID}?q=${searchQuery}`,{ replaceState:false,keepFocus:true })
        }
        else if(routeID==="users" && $SEARCH.query.trim()){
            goto(`/admin/users?q=${searchQuery}`,{ replaceState:false,keepFocus:true })
        }
        else if(routeID==="categories" && $SEARCH.query.trim()){
            const collectionName:string = $page.data.routeID 
            goto(`/admin/categories/${collectionName}?q=${searchQuery}`,{ replaceState:false,keepFocus:true })
        }
        else if(routeID==="tags" && $SEARCH.query.trim()){
            const collectionName:string = $page.data.routeID 
            goto(`/admin/tags/${collectionName}?q=${searchQuery}`,{ replaceState:false,keepFocus:true })
        }
        else if(routeID==="settings" && $SEARCH.query.trim()){
            const collectionName:string = $page.data.routeID 
            goto(`/admin/settings?q=${searchQuery}`,{ replaceState:false,keepFocus:true })
        }
    }
</script>

<div class="searchWrap">
    <input type="text" class="searchInput" {placeholder} bind:value={$SEARCH.query} on:keypress={handleInputClick}>
    <div class="searchIcon" data-label="Search" on:click={handleSearchClick}>
        <SearchIcon/>
    </div>
</div>

<style lang="scss">
    .searchWrap{
        width: 30%;
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
        /* background-color: #2a2e36; */
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
    @media(max-width:700px){
        .searchWrap{ flex: 1; }
    }
</style>