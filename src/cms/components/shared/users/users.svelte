<script lang="ts">
    export let showDel:boolean = true
    export let users:UserData[]
    import type { UserData } from "cms/types"
    import User from "./user.svelte";
</script>

<div class="users">
    {#each users as user}
        <User {user} on:delete {showDel}/>
    {/each}
</div>

<style lang="scss">
    .users{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 15px;
    }
    @media(max-width:700px){
        .users{
            gap: 10px;
        } 
    }
</style>