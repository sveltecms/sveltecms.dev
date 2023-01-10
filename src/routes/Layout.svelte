<script lang="ts">
    import css from "../app.css?inline"
    import Nav from "$comps/nav/Nav.svelte";
    import Footer from "$comps/footer/Footer.svelte";
</script>

{@html `<style>\n${css}\n</style>`}
<div class="layout">
    <Nav />
    <main>
        <slot />
    </main>
    <Footer />
</div>

<style>
    main{
        max-width: 1200px;
        width: 95%;
        margin: 20px auto 0 auto;
    }
</style>