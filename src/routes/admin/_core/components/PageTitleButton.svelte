<script lang="ts">
    export let title:string
    export let btnText:string = "ADD"
    export let icon:any = null
</script>

<div class="title">
    <h2>{title}</h2>
    <button class="link" on:click>
        {btnText}
        {#if icon}
            <div class="icon"><svelte:component this={icon}/></div>
        {/if}
    </button>
</div>

<style>
    .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--textColor);
        font-size: 20px;
        text-shadow: 2px 2px 0px #5b5b5b;
        margin-bottom: 10px;
    }
    h2{ font-weight: 600; }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--buttonColor);
        background-color: rgba(0,0,0,5%);
        border-radius: 50%;
        margin-left: 3px;
    }
    .link{
        cursor: pointer;
        border: none;
        font-size: 16px;
        font-weight: 400;
        padding: 8px 15px;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        box-shadow: 1px 1px 4px rgba(0,0,0,.2);
        border-radius: 20px;
        display: flex;
        align-items: center;
        text-transform: uppercase;
    }
</style>