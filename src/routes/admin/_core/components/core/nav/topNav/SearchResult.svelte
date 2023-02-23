<script lang="ts">
    import { SEARCH } from "$Stores";
    import Button from "$Comps/Button.svelte"
</script>

<div class="result">
    <Button />
    <Button />
    <Button />
    <Button />
</div>

<style lang="scss">
    .result{
        padding: 10px;
        border-radius: 0 0 3px 3px;
        background-color: rgba(0,0,0,.2);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
</style>