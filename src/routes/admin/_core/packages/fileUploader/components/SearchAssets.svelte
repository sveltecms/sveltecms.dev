<script lang="ts">
    const API_PATH = "/admin/api/assets"
    /** Whether file uploader is open or close */
    export let open:boolean
    export let allowSelection:boolean
    export let searchValue:string = ""
    import type { AssetData,ApiAssetsSearchLoad,ApiAssetsSearchData } from "$Types"
    import { fetchPost } from "$Utilities";
    import SearchIcon from "$Icons/Search.svelte"
    import CloseIcon from "$Icons/Close.svelte"
    import Assets from "./assets/Assets.svelte";
    /** Clear input value */
    function resetSearch(){
        searchValue = ""
        assets = []
    }
    /** Search assets */
    async function searchAssets() {
        const apiLoad:ApiAssetsSearchLoad = { count:4, filter:{ name:searchValue }}
        const apiResponse:ApiAssetsSearchData = await fetchPost("PATCH",API_PATH,apiLoad)
        assets = [...apiResponse]
    }
    let assets:AssetData[] = []
</script>

<div class="searchWrap">
    <input class="searchInput" type="text" placeholder="Search file..." bind:value={searchValue} on:keyup={searchAssets}>
    <div class="icon" on:click={resetSearch} on:keypress={resetSearch}>
        {#if searchValue.trim().length>0}
            <CloseIcon />
        {:else}
            <SearchIcon /> 
        {/if}
    </div>
</div>
<Assets {allowSelection} {assets} bind:open on:select/>

<style>
    .searchWrap{
        width: 100%;
        display: flex;
        align-items: center;
        background-color: var(--antiBodyBg);
        border-radius: 5px;
        overflow: hidden;
        padding: 10px 15px;
        margin-bottom: 10px;
    }
    .searchInput{
        width: 100%;
        border: none;
        background-color: transparent;
        color: var(--textColor);
        font-size: 17px;
        font-weight: 300;
    }
    .searchInput::placeholder{
        color: var(--textColor);
    }
    .searchInput:focus{
        outline: none;
    }
    .icon{
        cursor: pointer;
        fill: var(--iconColor);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>