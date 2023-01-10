<script>
    import svelteCMS from "$svelteCMS";
</script>

<ul class="links">
    <a href={svelteCMS.domainUrl} class="link" target="_blank" rel="noreferrer">About</a>
</ul>

<style lang="scss">
    .links{
        display: flex;
        align-items: center;
    }
    .link{
        font-size: 16px;
        font-weight: 300;
        margin-left: 10px;
        color: var(--footerColor);
    }
    @media(max-width:700px){
        .link{
            font-size: 14px;
            font-weight: 500;
        }
    }
</style>