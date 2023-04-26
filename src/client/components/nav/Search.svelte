<script lang="ts">
    import SearchIcon from "client/icons/Search.svelte"
</script>

<div class="search">
    <input type="text" placeholder="Search...">
    <div class="icon">
        <SearchIcon />
    </div>
</div>

<style lang="scss">
    .search{
        margin: 0 0 0 30px;
        display: flex;
        align-items: center;
        background-color: rgba(0,0,0,.2);
        border-radius: 10px;
        box-shadow: 1px 1px 4px rgba(0,0,0,.2);
    }
    input{
        cursor: not-allowed;
        background-color: transparent;
        padding: 10px 15px;
        border: none;
        font-size: 15px;
        font-weight: 300;
        &:focus{ outline: none; }
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px 10px;
        fill: var(--iconColor);
    }
</style>