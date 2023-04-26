<script lang="ts">
    export let title:string
    export let subTitle:string
    export let href:string
    export let hrefText:string = "Add"
    import { page } from "$app/stores"
    let appData = $page.data.appData
    href = appData.config.cmsPath+href
</script>

<div class="no-result">
    <h2>{title}</h2>
    <h3>{subTitle}</h3>
    <a data-sveltekit-preload-data {href} class="btn" on:click>{hrefText}</a>
</div>

<style>
    .no-result{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        border-radius: 5px;
        background-color: var(--antiBodyBg);
        color: var(--textColor);
        box-shadow: var(--boxShadow);
        margin-bottom: 20px;
        text-align: center;
    }
    h2{
        font-size: 40px;
        font-weight: 900;
        text-transform: uppercase;
        margin-bottom: 5px;
        -webkit-text-stroke: 1px var(--textColor);
    }
    h3{
        font-size: 25px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 7px;
    }
    .btn{
        font-size: 15px;
        font-weight: 400;
        padding: 10px 20px;
        border-radius: 50px;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        box-shadow: var(--boxShadow);
    }
    @media(max-width:700px){
        h2{
            font-size: 30px;
        }
        h3{
            font-size: 15px;
        }
        .btn{
            font-size: 14px;
            padding: 7px 10px;
        }
    }
</style>