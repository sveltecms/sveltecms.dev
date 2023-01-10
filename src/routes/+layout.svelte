<script lang="ts">
    import Layout from "./Layout.svelte";
    import { page } from "$app/stores";
    $: isAdminRoute = $page.url.pathname.includes("/admin")
</script>

{#if isAdminRoute}
    <slot />
{:else}
    <Layout>
        <slot />
    </Layout>
{/if}