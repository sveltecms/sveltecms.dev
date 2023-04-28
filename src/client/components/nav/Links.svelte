<script lang="ts">
    import SvelteIcon from "client/icons/Svelte.svelte";
    import Link from "./Link.svelte";
</script>

<ul class="navLinks">
    <Link href="/" title="Home"/>
    <Link href="/docs" title="Docs"/>
    <Link href="https://svelte.dev/" title="Svelte" icon={SvelteIcon} attributes={{ target:"_blank"}}/>
</ul>

<style lang="scss">
    .navLinks{
        flex: 1;
        display: flex;
        align-items: center;
        gap: 20px;
        justify-content: flex-end;
        list-style: none;
    }
    // Mobile
    @media(max-width:700px){
        .navLinks{
            justify-content: center;
        }
    }
</style>