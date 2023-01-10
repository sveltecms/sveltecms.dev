<script>
    const avatarImage = "/admin/avatar.png"
</script>

<a class="image" href="/admin/settings" data-sveltekit-preload-data>
    <img src={avatarImage} alt="user">
</a>

<style lang="scss">
    .image{
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 40px;
        max-height: 40px;
        border-radius: 50%;
        box-shadow: var(--boxShadow);
        overflow: hidden;
        margin: 0 0 0 10px;
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
    @media(max-width:700px){
        .image{
            margin: 0 15px 0 15px;
        }
    }
</style>