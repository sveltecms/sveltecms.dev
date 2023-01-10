<script lang="ts">
    export let icon:any
    export let margin:string = "0 5px 0 0"
</script>

<div class="icon" style="margin: {margin};">
    <svelte:component this={icon} />
</div>

<style>
    .icon{
        fill: var(--textColor);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>