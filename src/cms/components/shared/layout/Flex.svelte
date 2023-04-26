<script lang="ts">
    /** flex-direction for flex div */
    export let direction:"column"|"row" = "row"
</script>

<div class="flex" style="--direction:{direction};">
    <slot/>
</div>

<style>
    .flex{
        display: flex;
        flex-direction: var(--direction);
    }
    @media(max-width:700px){
        .flex{
            flex-direction: column;
        }
    }
</style>