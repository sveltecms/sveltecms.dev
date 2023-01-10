<script lang="ts">
    import svelteCMS from "$svelteCMS";
    const logoSrc = svelteCMS.logo
</script>

<a class="logo" href="/admin" data-sveltekit-preload-data>
    <img src={logoSrc} alt={svelteCMS.name}>
</a>

<style lang="scss">
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        width: 80px;
        margin: 10px;
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
</style>