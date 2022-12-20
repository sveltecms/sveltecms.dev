<script>
    import { socialMedias } from "$src/data"
    import TwitterIcon from "$icons/Twitter.svelte";
    import GithubIcon from "$icons/Github.svelte";
</script>

<div class="socialMedias">
    <a href={socialMedias.twitter.src} title={socialMedias.twitter.alt} target="_blank" rel="noreferrer" class="media">
        <TwitterIcon size=25/>
    </a>
    <a href={socialMedias.github.src} title={socialMedias.github.alt} target="_blank" rel="noreferrer" class="media">
        <GithubIcon size=25/>
    </a>
</div>

<style lang="scss">
    .socialMedias{
        border-radius: 2px;
        border-left: 1.5px solid #65676ba7;
        margin-left: 20px;
        padding: 5px;
        display: flex;
        align-items: center;
    }
    .media{
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--iconColor);
        margin-left: 15px;
        transition: fill ease-in-out 0.2s;
        &:hover{ fill: lightblue; }
    }
</style>