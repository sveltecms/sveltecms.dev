<script lang="ts">
    import { IS_NAV_OPEN } from "$Stores";
    import Logo from "./Logo.svelte";
    import Links from "./Links.svelte";
    /** Close nav when click outside */
    function closeNav(e:any){
        const clickedDiv:HTMLDivElement = e.target
        if(clickedDiv.classList.contains("mainHeader")){
            IS_NAV_OPEN.set(false)
        }
    }
</script>
<header class="mainHeader" class:open={$IS_NAV_OPEN} on:click={closeNav}>
    <nav class="mainNav">
        <Logo/>
        <Links />
    </nav>
</header>

<style lang="scss">
    .mainHeader{
        background-color: var(--navBg);
        color: var(--navLinkColor);
        border-right: 1px solid rgba(255,255,255,.1);
        min-height: 100vh;
        max-width: 140px;
        width: 100%;
        position: fixed;
        left: 0;
        z-index: 10;
        transition: background-color ease-in 1s;
    }
    .mainNav{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    // Mobile
    @media(max-width:700px){
        .mainHeader{
            border: none;
            max-width: 100%;
            transform: translateX(-100%);
            background-color: transparent;
        }
        .mainNav{ max-width: fit-content; }
        .mainHeader.open{
            transform: translateX(0%);
            background-color: rgba(0, 0, 0, 0.5);
            .mainNav{
                background-color: var(--navBg);
                min-height: 100vh;
                border-right: 1px solid rgba(255,255,255,.1);
            }
        }
    }
</style>