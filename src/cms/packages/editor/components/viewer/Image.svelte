<script lang="ts">
    export let image:EditorJsImageData['data']
    import type { EditorJsImageData } from "../../types"
</script>

<div class="image">
    <img src={image.url} alt={image.caption}>
</div>


<style>
    .image{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border-radius: 3px;
        overflow: hidden;
    }
    .image img{
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        object-position: center;
    }
</style>