<script lang="ts">
    export let users:UserData[]
    // Types
    import type { UserData } from "$Types"
    // Componenents
    import User from "./User.svelte";
</script>

<div class="users">
    {#each users as user (user._id)}
        <User {user} on:delete />
    {/each}
</div>

<style>
    .users{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
</style>