<script lang="ts">
    import SearchIcon from "$Icons/Search.svelte";
    // Variables
    let searchValue:string
</script>

<div class="searchWrap">
    <input type="text" class="searchInput" placeholder="Search..." bind:value={searchValue}>
    <div class="searchIcon" data-label="Search">
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