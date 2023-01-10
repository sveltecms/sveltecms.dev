<script lang="ts">
    export let image:AssetData
    /** Image maxt with*/
    export let maxWidth:string = "300px"
    import type { AssetData } from "$Packages/fileUploader/types";
    import svelteCMS from "$svelteCMS";
    import { fade } from "svelte/transition";
    $: imageSrc = `${svelteCMS.viewPaths.assets}/images/${image.path}`
</script>

<div class="imagePreview" style="--maxWidth:{maxWidth}">
    <img src={imageSrc} alt={image.name} in:fade="{{duration:200}}">
</div>

<style lang="scss">
    .imagePreview{
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: var(--maxWidth);
        overflow: hidden;
        border-radius: 5px;
        box-shadow: var(--boxShadow2);
        margin-bottom: 20px;
        img{ 
            max-width: 100%;
            max-height: 100%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
    @media(max-width:700px){
        .imagePreview{
            max-width: 100%;
        }
    }
</style>