<script lang="ts">
    const API_PATH = "/admin/api/categories"
    export let data:PageData
    import type { PageData } from "./$types"
    import type { CategoryData } from "$Types";
    import type { ApiCategoryDeleteLoad,ApiCategoryDeleteData } from "$Types";
    import type { FetchCategoriesLoad,FetchCategoriesRes } from "$Types/cms"
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    import { capitalize,fetchPost, wait } from "$Utilities";
    import { newToast } from "@anthony809/svelte-toasts/index";
    import PlusIcon from "$Icons/Plus.svelte";
    import PageTitleLink from "$Comps/PageTitleLink.svelte";
    import Categories from "$Comps/categories/Categories.svelte"
    import Button from "$Comps/Button.svelte";
    import NoResult from "$Comps/NoResult.svelte"
    /** Handle category delete */
    async function handleCategoryDelete(e:any) {
        const category:CategoryData = e.detail
        // Send remove category request
        const apiLoadData:ApiCategoryDeleteLoad = {...category,routeID}
        const apiResponse:ApiCategoryDeleteData = await fetchPost("DELETE",API_PATH,apiLoadData)
        // If category was deleted, remove from current categories list
        if(apiResponse.ok){
            const newCategoriesList = categories.filter(data=>data.slug!==category.slug)
            categories = [...newCategoriesList]
            newToast({ type:"ok",msg:apiResponse.msg})
        }
    }
    /** Load more categories */
    async function loadMore() {
        // Set loading more categories
        isGettingMoreCategories = true
        // Update page number
        pageNumber = pageNumber+1
        // Send api request
        const apiLoad:FetchCategoriesLoad = { filter:{},count:svelteCMS.config.categoriesPerPage,pageNumber,routeID }
        const apiResponse:FetchCategoriesRes = await fetchPost("PATCH",API_PATH,apiLoad) 
        if(apiResponse.length>0){
            if(apiResponse.length<svelteCMS.config.categoriesPerPage) resetStages()
            // Wait 500 milliseconds
            await wait(500)
            // Marge categories with response categories
            categories = [...categories,...apiResponse]
        }
        // Reset stages
        else await resetStages()
        // Remove loading more categories
        isGettingMoreCategories = false
    }
    /** Reset stages */ 
    async function resetStages(){
        // Wait 500 milliseconds
        await wait(500)
        showLoadMoreBtn = false
        pageNumber = 1
    }
    // Variable
    $: categories = data.categories
    $: routeID = data.routeID
    $: title = `${capitalize(routeID)}'s categories`
    $: newCategoryLink = `/admin/categories/${routeID}/create`
    $: showLoadMoreBtn = data.categories.length >= svelteCMS.config.categoriesPerPage
    let pageNumber = 1
    /** Indicate when loading more categories */
    let isGettingMoreCategories = false
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Categories",
        description:svelteCMS.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
{#if categories.length > 0}
    <PageTitleLink {title} icon={PlusIcon} href={newCategoryLink}/>
    <Categories {categories} on:delete={handleCategoryDelete}/>
    {#if showLoadMoreBtn}
        <Button loading={isGettingMoreCategories} text="Load more" centerBtn={true} --width="fit-content" on:click={loadMore}/>
    {/if}
{:else}
    <NoResult title={`No ${routeID}'s categories`} subTitle="Please add categories" href={`/admin/categories/${routeID}/create`} hrefText="Add category"/>
{/if}