<script>
    import TwitterIcon from "client/icons/Twitter.svelte";
    import GithubIcon from "client/icons/Github.svelte";
</script>

<div class="socialMedias">
    <a href="/" target="_blank" rel="noreferrer" class="media">
        <TwitterIcon size=25/>
    </a>
    <a href="/" target="_blank" rel="noreferrer" class="media">
        <GithubIcon size=25/>
    </a>
</div>

<style lang="scss">
    .socialMedias{
        border-radius: 2px;
        border-left: 1.5px solid #65676ba7;
        border-right: 1.5px solid #65676ba7;
        margin: 0px 20px;
        padding: 0px 20px;
        display: flex;
        align-items: center;
        gap: 20px;
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