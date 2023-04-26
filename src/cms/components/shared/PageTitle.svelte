<script lang="ts">
    export let title:string
    export let btnText:string|undefined = undefined
    export let link:{href:string,text:string}|undefined = undefined
    export let goBackHref:string|undefined = undefined
    import { page } from "$app/stores";
    import GoBackIcon from "cms/icons/ArrowLeft.svelte"
    $: cmsPath = $page.data.appData.config.cmsPath
</script>

<div class="title">
    {#if goBackHref}
        <a href={cmsPath+goBackHref} data-label="Go back" data-label-right class="goBack">
            <GoBackIcon />
        </a>
    {/if}
    <h2>{title}</h2>
    {#if btnText && !link}
        <button class="link" on:click>{btnText}</button>
    {/if}
    {#if link}
        <a href={cmsPath+link.href} class="link">{link.text}</a>
    {/if}
</div>

<style lang="scss">
    .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--textColor);
        margin-bottom: 15px;
    }
    h2{
        font-weight: 900;
        font-size: 40px;
        text-transform: uppercase;
        flex: 1;
    }
    .goBack{
        flex: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        background-color: var(--buttonBg);
        fill: var(--buttonColor);
        padding: 10px;
        border-radius: 50%;
        box-shadow: var(--boxShadow2);
        margin-right: 10px;
    }
    .link{
        cursor: pointer;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: var(--buttonColor);
        background-color: var(--buttonBg);
        box-shadow: var(--boxShadow);
        transition: transform ease-in-out 0.3s;
        &:hover{
            transform: scale(1.05);
        }
    }
    @media(max-width:700px){
        h2{
            font-size: 33px;
        }
        .link{
            padding: 8px 14px;
            font-weight: 400;
        }
        .goBack{
            padding: 6px;
        }
    }
</style>