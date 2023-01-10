<script lang="ts">
    const API_PATH = "/admin/api/categories"
    export let categories:CategoryData[]
    export let routeData:RouteData
    export let showSearchCategories:boolean = false
    import type { CategoryData,RouteData} from "$Types";
    import type { ApiCategoryCreateLoad,ApiCategoryCreateData,ApiCategorySearchLoad,ApiCategorySearchData } from "$Types/api";
    import svelteCMS from "$svelteCMS";
    import { fetchPost } from "$Utilities";
    import Search from "$Icons/Search.svelte";
    import Input from "$Elements/Input.svelte"
    import Item from "./Item.svelte"
    /** Handle search */
    async function handleSearch() {
        const apiLoadData:ApiCategorySearchLoad = {
          filter: { name:value },
          routeID: routeData.ID,
          count: 2
        }
        const apiResponse:ApiCategorySearchData = await fetchPost("PATCH",API_PATH,apiLoadData)
        resultCategories = [...apiResponse]
    }
    /** select item from api result */
    async function pickItem(e:any) {
        const category:CategoryData = e.detail
        categories=[...categories,category]
        // Reset all
        resetValues()
    }
    /** Create and Add new item */
    async function createItem(e:any) {
        const category:CategoryData = e.detail
        const apiLoadData:ApiCategoryCreateLoad = { ...category,routeID:routeData.ID }
        const apiResponse:ApiCategoryCreateData = await fetchPost("PUT",API_PATH,apiLoadData)
        // If category was created
        if(apiResponse.ok) categories=[...categories,apiResponse.category]
        // Reset all
        resetValues()
    }
    /** Remove item */
    async function removeItem(e:any) {
        const category:CategoryData = e.detail
        const newCategories = categories.filter(data=>data.slug!==category.slug)
        categories = [...newCategories]
    }
    // Reset all values
    function resetValues(){
        value = ""
        resultCategories = []
    }
    /** search value */
    let value:string = ""
    /** search result values list */
    let resultCategories:CategoryData[] = []
    /** Indicate if need to create new item */
    $: showCreateNewItem = (value.trim().length>0 && resultCategories.length>0 && resultCategories[0].name.toLowerCase()!==value.toLowerCase()) || (resultCategories.length===0 && value.trim().length>0)
    /** Check if db results exists in categories list */
    $: pickCategory = resultCategories.length>0 && !categories.find(data=>data.slug===resultCategories[0].slug)
</script>

<div class="container">
    {#if showSearchCategories}
        <Input bind:value icon={Search} placeholder="Search..." on:keyup={handleSearch}/>
        {#if showCreateNewItem }
            <Item category={{name:value,slug:value,description:value,image:svelteCMS.defaults.asset}} on:click={createItem}/>
        {/if}
        {#if pickCategory }
            <Item category={resultCategories[0]} on:click={pickItem}/>
        {/if}
    {/if}
    <div class="items">
        {#each categories as category (category._id)}
            <Item active={true} {category} on:click={removeItem}/>
        {/each}
    </div>
</div>
<style lang="scss">
    .items{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 10px;
    }
</style>