<script>
    import SocialMedias from "./SocialMedias.svelte";
</script>

<footer class="mainFooter">
    <div class="content">
        <p>©svelteCMS</p>
        <SocialMedias />
    </div>
</footer>

<style>
    .mainFooter{
        background-color: var(--antiBodyBg);
        padding: 10px 0px;
    }
    .content{
        max-width: var(--maxWidth);
        width: 95%;
        margin: auto;
        color: white;
        display: flex;
        justify-content: space-between;
        text-transform: uppercase;
    }
</style>