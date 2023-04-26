<script lang="ts">
    import type { CardData } from "$types";
    export let data:CardData[]
    import Card from "./Card.svelte";
</script>

<div class="cards">
    {#each data as cardData}
        <Card  data={cardData}/>
    {/each}
</div>

<style>
    .cards{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 50px;
        flex-wrap: wrap;
    }
</style>