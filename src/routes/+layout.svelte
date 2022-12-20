<script lang="ts">
    import"../app.css"
    import Nav from "$comps/nav/Nav.svelte";
</script>

<div class="layout">
    <Nav />
    <main>
        <slot />
    </main>
</div>

<style>
    main{
        max-width: 1200px;
        width: 95%;
        margin: 20px auto 0 auto;
    }
</style>