<script>
    import TwitterIcon from "client/icons/Twitter.svelte";
    import GithubIcon from "client/icons/Github.svelte";
</script>

<div class="socialMedias">
    <a href="https://twitter.com/svelteCMS" target="_blank" rel="noreferrer" class="media">
        <TwitterIcon size=25/>
    </a>
    <a href="https://github.com/sveltecms" target="_blank" rel="noreferrer" class="media">
        <GithubIcon size=25/>
    </a>
</div>

<style lang="scss">
    .socialMedias{
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: 10px;
    }
    .media{
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--iconColor);
        transition: fill ease-in-out 0.2s;
        &:hover{ fill: lightblue; }
    }
</style>