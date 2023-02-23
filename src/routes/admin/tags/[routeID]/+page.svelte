<script lang="ts">
    const API_PATH = "/admin/api/tags"
    export let data:PageData
    import type { PageData } from "./$types"
    import type { TagData } from "$Types";
    import type { ApiTagDeleteLoad,ApiTagDeleteData } from "$Types";
    import type { FetchTagsLoad,FetchTagsRes } from "$Types/cms"
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    import { newToast } from "@anthony809/svelte-toasts/index";
    import { capitalize,fetchPost, wait } from "$Utilities";
    import PlusIcon from "$Icons/Plus.svelte";
    import PageTitleLink from "$Comps/PageTitleLink.svelte";
    import Tags from "$Comps/tags/Tags.svelte"
    import Button from "$Comps/Button.svelte";
    import NoResult from "$Comps/NoResult.svelte"
    /** Handle tag delete */
    async function handleTagDelete(e:any) {
        const tag:TagData = e.detail
        // Send remove tag request
        const apiLoadData:ApiTagDeleteLoad = {...tag,routeID}
        const apiResponse:ApiTagDeleteData = await fetchPost("DELETE",API_PATH,apiLoadData)
        // If tag was deleted, remove from current tags list
        if(apiResponse.ok){
            const newTagsList = tags.filter(data=>data.slug!==tag.slug)
            tags = [...newTagsList]
            newToast({ type:"ok",msg:apiResponse.msg})
        }
    }
    /** Load more tags */
    async function loadMore() {
        // Set loading more tags
        isGettingMoreTags = true
        // Update page number
        pageNumber = pageNumber+1
        // Send api request
        const filter = data.query ? { name:data.query } : {}
        const apiLoad:FetchTagsLoad = { filter,count:svelteCMS.config.tagsPerPage,pageNumber,routeID }
        const apiResponse:FetchTagsRes = await fetchPost("PATCH",API_PATH,apiLoad) 
        if(apiResponse.length>0){
            if(apiResponse.length<svelteCMS.config.tagsPerPage) resetStages()
            // Wait 500 milliseconds
            await wait(500)
            // Marge tags with response tags
            tags = [...tags,...apiResponse]
        }
        // Reset stages
        else await resetStages()
        // Remove loading more tags
        isGettingMoreTags = false
    }
    /** Reset stages */ 
    async function resetStages(){
        // Wait 500 milliseconds
        await wait(500)
        showLoadMoreBtn = false
        pageNumber = 1
    }
    $: tags = data.tags
    $: routeID = data.routeID
    $: title = data.query ? `Result for : ${data.query}` : `${capitalize(routeID)}'s tags`
    $: newTagLink = `/admin/tags/${routeID}/create`
    $: showLoadMoreBtn = data.tags.length >= svelteCMS.config.tagsPerPage
    let pageNumber = 1
    /** Indicate when loading more tags */
    let isGettingMoreTags = false
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Tags",
        description:svelteCMS.site.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
{#if tags.length > 0}
    <PageTitleLink {title} icon={PlusIcon} href={newTagLink} />
    <Tags {tags} on:delete={handleTagDelete}/>
    {#if showLoadMoreBtn}
        <Button loading={isGettingMoreTags} text="Load more" centerBtn={true} --width="fit-content" on:click={loadMore}/>
    {/if}
{:else}
    <NoResult title={`No ${routeID}'s tags`} subTitle="Please add tags" href={`/admin/tags/${routeID}/create`} hrefText="Add tag"/>
{/if}