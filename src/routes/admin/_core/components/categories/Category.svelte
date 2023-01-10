<script lang="ts">
    export let category:CategoryData
    import type { CategoryData } from "$Types"
    import svelteCMS from "$svelteCMS";
    import ActionsButtons from "./ActionsButtons.svelte";
    $: src = `${svelteCMS.urlBases.assets}/images/${category.image.path}`
    $: alt = category.name
</script>

<div class="category">
    <div class="image">
        <img {src} {alt}>
    </div>
    <span class="name">{category.name}</span>
    <ActionsButtons {category} on:delete/>
</div>

<style lang="scss">
    .category{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding:7px 10px;
        margin-bottom: 15px;
        background-color: var(--antiBodyBg);
        box-shadow: var(--boxShadow);
        border-radius: 5px;
    }
    .image{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 15px;
        box-shadow: var(--boxShadow2);
        img{
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
    .name{
        font-size: 17px;
        font-weight: 300;
        margin-right: 10px;
        color: var(--textColor);
        flex: 1;
    }
</style>