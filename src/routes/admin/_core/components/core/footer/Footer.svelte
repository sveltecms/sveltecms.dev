<script lang="ts">
    import Links from "./Links.svelte";
    import SocialMedias from "./SocialMedias.svelte";
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
        border-radius: 5px;
    }
</style>