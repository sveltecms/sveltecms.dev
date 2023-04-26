<script lang="ts">
    export let stats:{name:string, count:number, href:string}[]
    import Stat from "./Stat.svelte";
</script>

<div class="stats">
    {#each stats as stat }
        <Stat {stat}/> 
    {/each}
 </div>
 
 <style>
    .stats{
       display: flex;
       align-items: center;
       flex-wrap: wrap;
       margin-bottom: 10px;
    }
 </style>