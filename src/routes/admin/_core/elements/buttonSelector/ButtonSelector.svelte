<script lang="ts">
    export let data:string[]
    export let currentValue:any
    import Button from "./button.svelte"
</script>

<div class="buttons">
    {#each data as data}
        <Button {data} bind:currentValue/>
    {/each}
</div>

<style>
    .buttons{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 10px;
    }
</style>
