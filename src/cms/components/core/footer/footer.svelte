<script lang="ts">
    import Links from "./links.svelte";
    import SocialMedias from "./socialMedias.svelte";
</script>

<div class="footer">
    <Links />
    <SocialMedias/>
</div>

<style>
    .footer{
        padding: 10px;
        background-color: var(--footerBg);
        color: var(--footerColor);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>