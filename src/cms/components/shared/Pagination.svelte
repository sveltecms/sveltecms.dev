<script lang="ts">
    export let baseDir:string
    export let page:number
    export let itemsCount:number
    export let itemsPerPage:number
    import { page as pageStore } from "$app/stores"
    $: pagesCount = (itemsCount / itemsPerPage)
    $: nextPage = page > pagesCount ? page : page + 1
    $: prevPage = page <= 1 ? 1 : page - 1
    $: appData = $pageStore.data.appData
    $: cmsBase = appData.config.cmsPath
    $: searchQuery = $pageStore.url.searchParams.get("q")
</script>

<ul class="pagination">
    <a href={`${cmsBase}/${baseDir}?page=${prevPage}${searchQuery?`&q=${searchQuery}`:""}`} class="link" class:active={page<=1}>&lt;</a> 
    <a href={`${cmsBase}/${baseDir}?page=${page}${searchQuery?`&q=${searchQuery}`:""}`} class="link active">{page}</a>  
    <a href={`${cmsBase}/${baseDir}?page=${nextPage}${searchQuery?`&q=${searchQuery}`:""}`} class="link" class:active={page>=pagesCount}>&gt;</a>
</ul>

<style lang="scss">
    .pagination{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin: 15px 0px;
    }
    .link{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 13px 20px;
        border-radius: 5px;
        font-size: 15px;
        font-weight: 900;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        fill: var(--buttonColor);
        box-shadow: var(--boxShadow2);
        -webkit-text-stroke: 1.5px;
        // animation on hover
        transition: background-color ease-in-out 0.2s;
        &:hover{ background-color: var(--buttonBg2) }
    }
    .active{
        cursor: not-allowed;
        background-color: var(--buttonBg2);
    }
</style>