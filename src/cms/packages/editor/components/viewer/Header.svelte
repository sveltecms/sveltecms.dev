<script lang="ts">
    export let text:string
    export let level:number
</script>

{#if level===1}
    <h1>{@html text}</h1>
{:else if level===2}
    <h2>{@html text}</h2>
{:else if level===3}
    <h3>{@html text}</h3>
{:else if level===4}
    <h4>{@html text}</h4>
{:else if level===5}
    <h5>{@html text}</h5>
{:else if level===6}
    <h6>{@html text}</h6>
{/if}