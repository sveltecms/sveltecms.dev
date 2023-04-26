<div class="rightContent">
    <slot/>
</div>

<style>
    .rightContent{
        border-radius: 5px;
        max-width: var(--maxWidth,250px);
        width: 100%;
        height: fit-content;
        margin-left: 20px;
        padding: 10px;
        background-color: #0000000d;
        box-shadow: -1px -1px 4px rgb(0 0 0 / 20%);
        border: 1px solid rgb(255 255 255 / 5%);
    }
    @media(max-width:700px){
        .rightContent{
            max-width: 100%;
            margin-top: 10px;
            margin-left: 0px;
        }
    }
</style>