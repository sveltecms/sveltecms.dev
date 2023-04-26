<script lang="ts">
    import TwitterIcon from "cms/icons/Twitter.svelte";
    import { page } from "$app/stores";
    $: appData = $page.data.appData
    $: twitter = appData.site.socialMedias.twitter
</script>

<div class="medias">
    <a href="https://twitter.com/{twitter}" rel="noreferrer" target="_blank" data-label-top data-label="Twitter">
        <div class="icon">
            <TwitterIcon />
        </div>
    </a>
</div>

<style>
    .medias{
        display: flex;
        align-items: center;
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        fill: var(--iconColor);
        background-color: var(--bodyBg);
        box-shadow: var(--boxShadow);
        padding: 10px;
        border-radius: 50%;
    }
    @media(max-width:700px){
        .icon{
            margin-left: 10px;
            padding: 7px;
        }
    }
</style>