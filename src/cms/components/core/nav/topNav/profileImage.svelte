<script lang="ts">
    import { page } from "$app/stores";
    $: userData = $page.data.userData
    $: src = userData.image.src
    $: cmsPath = $page.data.appData.config.cmsPath
</script>

<a class="image" href="{cmsPath}/settings" data-sveltekit-preload-data>
    <img {src} alt="user">
</a>

<style lang="scss">
    .image{
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        box-shadow: var(--boxShadow);
        overflow: hidden;
        margin-left: 20px;
        // Hover animation
        transition: transform ease-in-out 0.3s;
        &:hover{ transform: scale(1.05) }
        // Images
        img{
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
        }
    }
    // On mobile
    /* @media(max-width:700px){
        .image{
            max-width: 35px;
            max-height: 35px;
        }
    } */
</style>