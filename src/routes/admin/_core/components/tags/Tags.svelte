<script lang="ts">
    export let tags:TagData[]
    // Types
    import type { TagData } from "$Types"
    // Componenents
    import Tag from "./Tag.svelte";
</script>

<div class="tags">
    {#each tags as tag}
        <Tag {tag} on:delete />
    {/each}
</div>

<style>
    .tags{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
</style>