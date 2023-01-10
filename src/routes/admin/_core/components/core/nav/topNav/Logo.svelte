<script lang="ts">
    import svelteCMS from "$svelteCMS";
    const logoSrc = svelteCMS.logo
</script>

<a class="logo" href="/admin" data-sveltekit-preload-data>
    <img src={logoSrc} alt={svelteCMS.name}>
</a>

<style lang="scss">
    .logo{
        display: none;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
        margin-right: 15px;
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
     // Mobile
     @media(max-width:700px){
        .logo{ display: flex; }
    }
</style>