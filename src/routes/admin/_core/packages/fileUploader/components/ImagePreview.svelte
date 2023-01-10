<script lang="ts">
    export let alt:string
    export let src:string
</script>

<div class="image">
    <img {src} {alt}>
</div>
<input class="assetNameInput" type="text" bind:value={alt} placeholder="Asset name...">

<style>
    .image{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 5px 5px 0 0;
        overflow: hidden;
        background-color: var(--antiBodyBg);
    }
    img{
        object-fit: cover;
        object-position: center;
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
    }
    .assetNameInput{
        border: none;
        width: 100%;
        text-align: center;
        background-color: var(--antiBodyBg);
        color: var(--textColor);
        padding: 10px 15px;
        box-shadow: 0 1px 4px rgba(0,0,0,.3);
        border-radius: 0 0 5px 5px;
        margin-bottom: 10px;
    }
    .assetNameInput:focus{ outline: none; }
</style>