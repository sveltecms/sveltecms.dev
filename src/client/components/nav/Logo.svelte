<script lang="ts">
    import logoSrc from "client/static/logo.png"
</script>

<a href="/" class="logo">
    <img src={logoSrc} alt="Logo">
</a>

<style lang="scss">
    .logo{
        height: 45px;
        img{
            object-fit: cover;
            object-position: center;
            max-width: 100%;
            max-height: 100%;
        }
    }
    @media(max-width:700px){
        .logo{
            height: 35px;
        }
    }
</style>