<script lang="ts">
    const API_PATH = "/admin/api/tags"
    export let tags:TagData[]
    export let routeData:RouteData
    export let showSearchTags:boolean = false
    import type { TagData,RouteData} from "$Types";
    import type { ApiTagCreateLoad,ApiTagCreateData,ApiTagSearchLoad,ApiTagSearchData } from "$Types/api";
    import { fetchPost } from "$Utilities";
    import Search from "$Icons/Search.svelte";
    import Input from "$Elements/Input.svelte"
    import Item from "./Item.svelte"
    /** Handle search */
    async function handleSearch() {
        const apiLoadData:ApiTagSearchLoad = {
          filter: { name:value },
          routeID: routeData.ID,
          count: 2
        }
        const apiResponse:ApiTagSearchData = await fetchPost("PATCH",API_PATH,apiLoadData)
        resultTags = [...apiResponse]
    }
    /** select item from api result */
    async function pickItem(e:any) {
        const tag:TagData = e.detail
        tags=[...tags,tag]
        // Reset all
        resetValues()
    }
    /** Create and Add new item */
    async function createItem(e:any) {
        const tag:TagData = e.detail
        const apiLoadData:ApiTagCreateLoad = { ...tag,routeID:routeData.ID }
        const apiResponse:ApiTagCreateData = await fetchPost("PUT",API_PATH,apiLoadData)
        // If tag was created
        if(apiResponse.ok) tags=[...tags,apiResponse.tag]
        // Reset all
        resetValues()
    }
    /** Remove item */
    async function removeItem(e:any) {
        const tag:TagData = e.detail
        const newTags = tags.filter(data=>data.slug!==tag.slug)
        tags = [...newTags]
    }
    // Reset all values
    function resetValues(){
        value = ""
        resultTags = []
    }
    /** search value */
    let value:string = ""
    /** search result values list */
    let resultTags:TagData[] = []
    /** Indicate if need to create new item */
    $: showCreateNewItem = (value.trim().length>0 && resultTags.length>0 && resultTags[0].name.toLowerCase()!==value.toLowerCase()) || (resultTags.length===0 && value.trim().length>0)
    /** Check if db results exists in tags list */
    $: pickTag = resultTags.length>0 && !tags.find(data=>data.slug===resultTags[0].slug)
</script>

<div class="container">
    {#if showSearchTags}
        <Input bind:value icon={Search} placeholder="Search..." on:keyup={handleSearch}/>
        {#if showCreateNewItem }
            <Item tag={{name:value,description:value,slug:value}} on:click={createItem}/>
        {/if}
        {#if pickTag }
            <Item tag={resultTags[0]} on:click={pickItem}/>
        {/if}
    {/if}
    <div class="items">
        {#each tags as tag (tag._id)}
            <Item active={true} {tag} on:click={removeItem}/>
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