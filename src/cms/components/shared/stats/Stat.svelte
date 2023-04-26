<script lang="ts">
    export let stat:{name:string, count:number, href:string};
    import { fade } from "svelte/transition";
</script>

<div class="stat" in:fade>
    <div class="progress">{stat.count}</div>
    <span class="title">{stat.name}</span>
    <a href={stat.href} data-sveltekit-preload-data class="link">View</a>
</div>

<style lang="scss">
    $size: 50px;
    .stat{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        padding: 10px;
        background-color: var(--antiBodyBg);
        width: calc(100% / 4 - 10px);
        &:nth-child(1){ margin-right: 10px; }
        &:nth-child(2){ margin-right: 10px; }
        &:nth-child(3){ margin-right: 10px; }
    }
    .progress{
        width: $size;
        height: $size;
        border-radius: 50%;
        border: var(--mainColor) solid 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 900;
        background-color: white;
        color: var(--mainColor);
        padding: 10px;
    }
    .title{
        font-size: 15px;
        font-weight: 400;
        color: var(--headerColor);
        text-transform: uppercase;
    }
    .link{
        text-decoration: none;
        font-size: 13px;
        font-weight: 400;
        color: var(--buttonColor);
        background-color: var(--buttonBg);
        box-shadow: var(--boxShadow);
        padding: 8px 14px;
        border-radius: 20px;
    }
    // mobile
    @media(max-width:1000px){
        .stat{
            width: 100%;
            &:nth-child(1){ margin: 0px 0px 10px 0px; }
            &:nth-child(2){ margin: 0px 0px 10px 0px; }
            &:nth-child(3){ margin: 0px 0px 10px 0px; }
        }
        .progress{
            width: 60px;
            height: 60px;
            font-size: 25px;
            font-weight: 700;
            border: var(--mainColor) solid 5px;
        }
        .title{
            font-size: 15px;
        }
    }
</style>