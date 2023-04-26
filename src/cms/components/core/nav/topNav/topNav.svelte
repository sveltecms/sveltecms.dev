<script lang="ts">
    import Search from "./search.svelte";
    import ProfileImage from "./profileImage.svelte";
</script>

<header class="secondHeader">
    <Search />
    <ProfileImage />
</header>

<style lang="scss">
    .secondHeader{
        position: sticky;
        top: 0;
        z-index: 6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(33 37 45);
        box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
        padding: 10px;
    }
</style>