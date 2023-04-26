<script lang="ts">
    import"client/static/layout.css"
    import Nav from "client/components/nav/Nav.svelte";
    import Footer from "client/components/footer/Footer.svelte";
</script>

<div class="client">
    <Nav />
    <main>
        <slot />
    </main>
    <Footer />
</div>

<style>
    .client{
        background: var(--bodyBg);
    }
    main{
        max-width: 1200px;
        width: 95%;
        margin: 20px auto 0 auto;
    }
</style>