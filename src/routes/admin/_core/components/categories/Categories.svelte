<script lang="ts">
    export let categories:CategoryData[]
    // Types
    import type { CategoryData } from "$Types"
    // Components
    import Category from "./Category.svelte";
</script>

<div class="categories">
    {#each categories as category}
        <Category {category} on:delete />
    {/each}
</div>

<style>
    .categories{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
</style>