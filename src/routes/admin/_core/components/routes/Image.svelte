<script lang="ts">
    export let image:AssetData
    import type { AssetData } from "$Types";
</script>

<div class="image">
    <img src="/admin/api/assets/images/{image.path}" alt="images">
</div>

<style>
    .image{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        position: relative;
    }
    img{
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
    }
</style>