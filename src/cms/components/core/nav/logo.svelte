<script lang="ts">
    import logoSrc from "cms/static/logo.png"
    import { page } from "$app/stores";
    $: appData = $page.data.appData
    $: cmsPath = appData.config.cmsPath
</script>

<a class="logo" href={cmsPath} data-sveltekit-preload-data>
    <img src={logoSrc} alt={appData.site.name}>
</a>

<style lang="scss">
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        height: auto;
        width: 100%;
        overflow: hidden;
        background-color: var(--mainColor);
        img{
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
            // Hover animation
            transition: transform ease-in-out 0.3s;
            &:hover{ transform: scale(1.05) }
        }
    }
</style>