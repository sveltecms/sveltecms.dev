<div class="content">
    <slot/>
</div>

<style lang="scss">
    .content{
        display: flex;
        margin-top: 20px;
        position: relative;
    }
    @media(max-width:700px){
        .content{
            flex-direction: column;
        }
    }
</style>