<script lang="ts">
    export let value:string
    import { createEventDispatcher } from "svelte";
    import SearchIcon from "cms/icons/Search.svelte";
    const dispatch = createEventDispatcher()
    /** Click search when click enter key */
    function handleInputClick(e:any){
        if(e.key==="Enter"){
            handleSearchClick()
        }
    }
    /** Send custom search event */
    function handleSearchClick() { dispatch("change") }
</script>

<div class="searchWrap">
    <input type="text" class="searchInput" placeholder="search..." bind:value on:keyup={handleSearchClick}>
    <div class="searchIcon" data-label="Search" on:click={handleSearchClick} on:keypress={handleSearchClick}>
        <SearchIcon/>
    </div>
</div>

<style lang="scss">
    .searchWrap{
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 20px;
    }
    .searchInput{
        width: 100%;
        border: none;
        border-radius: 5px;
        background-color: var(--antiBodyBg);
        color: var(--textColor);
        padding: 12px;
        font-size: 20px;
        font-weight: 300;
        box-shadow: var(--boxShadow2);
        &:focus{ outline: none;}
        &::placeholder{
            font-size: 16px;
            color: var(--textColor);
        }
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