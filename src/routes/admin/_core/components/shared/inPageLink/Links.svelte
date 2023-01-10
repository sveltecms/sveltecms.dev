<script lang="ts">
    export let links:{ title:string,href:string }[] = [
        { title:"Settings",href:"/admin/settings"},
        { title:"Routes",href:"/admin/settings/routes"},
        { title:"New route",href:"/admin/settings/routes/new"},
    ]
    import Link from "./link.svelte";
</script>

<ul class="links">
    {#each links as link}
        <Link {link}/>
    {/each}
</ul>

<style>
    .links{
        display: flex;
        margin-bottom: 10px;
    }
</style>
