<script lang="ts">
    import Link from "./Link.svelte";
</script>

<ul class="navLinks">
    <Link href="/" title="Home"/>
    <Link href="/docs" title="Docs"/>
    <Link href="https://kit.svelte.dev/" title="SvelteKit" attributes={{ target:"_blank"}}/>
</ul>

<style>
    .navLinks{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        list-style: none;
    }
</style>