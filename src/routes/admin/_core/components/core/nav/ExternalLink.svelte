<script lang="ts">
    export let icon:any
    export let href:string
    export let text:string
    const atributes = { "data-label-right":"", "data-label":text }
</script>

<a {href} {...atributes} class="link" target="_blank" rel="noreferrer">
    <div class="icon">
        <svelte:component this={icon}/>
    </div>
    <span class="title">{text}</span>
</a>

<style lang="scss">
    .link{
        display: flex;
        align-items: center;
        padding: 10px 20px;
        margin-bottom: 10px;
        color: var(--navLinkColor);
        fill: var(--navLinkColor);
        font-size: 15px;
        font-weight: 300;
        position: relative;
        &:hover{ background-color: var(--navLinkHoverBg); }
        &:hover::after{
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            height: 100%;
            width: 3px;
            background-color: var(--mainColor);
        }
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
    }
</style>