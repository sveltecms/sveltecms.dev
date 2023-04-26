<script lang="ts">
    export let searchValue:string
</script>

<h2>No result founded for:{searchValue}</h2>

<style lang="scss">
    h2{
        padding: 10px;
        background-color: var(--antiBodyBg);
        color: var(--textColor);
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
        border-radius: 5px;
        box-shadow: var(--boxShadow2);
        text-align: center;
    }
</style>