<script lang="ts">
    const API_PATH = "/admin/api/objects"
    export let data:PageData
    import type { PageData } from "./$types"
    import type { ApiObjectDeleteLoad,ApiObjectDeleteData,ObjectData } from "$Types";
    import type { FetchRouteObjectsLoad,FetchRouteObjectsRes } from "$Types/cms";
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    import { wait,fetchPost, capitalize } from "$Utilities";
    // Packages
    import { newToast } from "@anthony809/svelte-toasts/index";
    // Comps
    import PageTitleLink from "$Comps/PageTitleLink.svelte"
    import Objects from "$Comps/routes/objects/Objects.svelte"
    import Button from "$Comps/Button.svelte"
    import NoResult from "$Comps/NoResult.svelte"
    /** Handle route's object deletion */
    async function handleObjectDeletion(e:any) {
        const object:ObjectData = e.detail
        const apiLoadData:ApiObjectDeleteLoad = {...object,routeID}
        const apiResponse:ApiObjectDeleteData = await fetchPost("DELETE",API_PATH,apiLoadData)
        // If route object was deleted
        if(apiResponse.ok){
            newToast({ type:"ok",msg:apiResponse.msg})
            const newRouteObjects = routeObjects.filter(data=>data._id!==object._id)
            routeObjects = [...newRouteObjects]
        } 
        else newToast({ type:"error",msg:apiResponse.msg})
    }
    /** Load more route objects */
    async function loadMoreRouteObjects() {
        // Set loading more routes
        loadMoreBtnLoading = true
        // Update page number
        pageNumber = pageNumber+1
        // Send api request
        const apiLoad:FetchRouteObjectsLoad = { filter:{},routeID,count:svelteCMS.config.objectsPerPage,pageNumber }
        const apiResponse:FetchRouteObjectsRes = await fetchPost("PATCH",API_PATH,apiLoad) 
        if(apiResponse.length>0){
            if(apiResponse.length<svelteCMS.config.objectsPerPage) resetStages()
            // Wait 500 milliseconds
            await wait(500)
            // Marge routes with response routes
            routeObjects = [...routeObjects,...apiResponse]
        }
        // Reset stages
        else await resetStages()
        // Remove loading more routes
        loadMoreBtnLoading = false
    }
    /** Reset stages */
    async function resetStages(){
        // Wait 500 milliseconds
        await wait(500)
        showLoadMoreBtn = false
        pageNumber = 1
    }
    // Route data
    $: routeID = data.routeData.ID
    $: routeData = data.routeData
    $: routeObjects = data.routeObjects
    // Variables
    /** Indicate when loading more Routes */
    let loadMoreBtnLoading:boolean = false
    /** Current page number */
    let pageNumber:number = 1
    /** Indicate if show load more button or not */
    let showLoadMoreBtn:boolean = data.routeObjects.length >= svelteCMS.config.objectsPerPage
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:data.routeData.meta.title,
        description:data.routeData.meta.description,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
<PageTitleLink title={capitalize(routeData.title)} href="/admin/objects/{routeData.ID}/create" linkText="Add object" goBackSrc="/admin/routes"/>
{#if routeObjects.length > 0}
    <Objects objects={routeObjects} on:delete={handleObjectDeletion}/>
    {#if showLoadMoreBtn}
        <Button loading={loadMoreBtnLoading} text="Load more" centerBtn={true} --width="fit-content" on:click={loadMoreRouteObjects}/>
    {/if}
{:else}
    <NoResult title="No objects founded" subTitle="Please add some objects" href={`/admin/objects/${routeID}/create`} hrefText="Add object"/>
{/if}
