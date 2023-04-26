<script lang="ts">
    export let href:string
    export let title:string
    export let icon:any = undefined
    export let attributes:any = { }
    import { page } from "$app/stores";
    $: active = href === ( ($page.url.pathname.endsWith("/") && $page.url.pathname!=="/") ? String($page.url.pathname.slice(0,-1)) : $page.url.pathname)
</script>

<li class="navLink" class:active>
    <a {href} {...attributes}>
        {#if icon}
            <div class="icon">
                <svelte:component this={icon} />
            </div>
        {/if}
        {title}
    </a>
</li>

<style>
    .navLink a{
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 500;
        margin-left: 20px;
        color: var(--navColor);
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .navLink a{ position: relative; }
    .navLink.active a::after , .navLink a:hover::after{
        position: absolute;
        content: "";
        left: 50%;
        transform: translateX(-50%);
        top: calc(100% + 7px);
        width: 100%;
        height: 3px;
        border-radius: 10px;
        background-color: var(--mainColor);
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>