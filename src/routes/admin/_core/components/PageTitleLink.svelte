<script lang="ts">
    export let title:string
    export let href:string
    export let disabledPreload:boolean = false
    export let linkText:string = "ADD"
    export let icon:any = null
    /** Show go back link */
    export let goBackSrc:string|undefined = undefined
    // Icons
    import GoBackIcon from "$Icons/ArrowLeftShort.svelte"
</script>

<div class="title">
    {#if goBackSrc}
        {#if disabledPreload}
            <a href={goBackSrc} data-label="Go back" data-label-right class="goBack">
                <GoBackIcon />
            </a>
        {:else}
            <a href={goBackSrc} data-sveltekit-preload-data data-label="Go back" data-label-right class="goBack">
                <GoBackIcon />
            </a>
        {/if}
    {/if}
    <h2>{title}</h2>
    {#if disabledPreload}
        <a {href} class="link">
            {linkText}
            {#if icon}
                <div class="icon"><svelte:component this={icon}/></div>
            {/if}
        </a>
    {:else}
        <a {href} class="link" data-sveltekit-preload-data>
            {linkText}
            {#if icon}
                <div class="icon"><svelte:component this={icon}/></div>
            {/if}
        </a>
    {/if}
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
    .goBack{
        flex: 0;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        background-color: var(--buttonBg);
        fill: var(--buttonColor);
        padding: 5px;
        border-radius: 50%;
        box-shadow: var(--boxShadow2);
    }
    h2{
        flex: 1;
        font-weight: 600;
    }
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