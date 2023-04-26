<script lang="ts">
    import { page } from "$app/stores";
    $: cmsPath = $page.data.appData.config.cmsPath
</script>

<ul class="links">
    <a href={cmsPath} class="link">Home</a>
    <a href={cmsPath} class="link">About</a>
</ul>

<style lang="scss">
    .links{
        display: flex;
        align-items: center;
    }
    .link{
        font-size: 16px;
        font-weight: 300;
        margin-left: 10px;
        color: var(--footerColor);
    }
    @media(max-width:700px){
        .link{
            font-size: 14px;
            font-weight: 500;
        }
    }
</style>