<script lang="ts">
    export let options:string[]
    export let value:string
</script>

<select class="select" bind:value>
    {#each options as value }
        <option {value}>{value}</option>            
    {/each}
</select>

<style>
    .select{
        cursor: pointer;
        padding: 8px 10px;
        border-radius: 50px;
        border: 1px solid #292929;
        background-color: var(--buttonBg2);
        color: var(--textColor);
        font-size: 14px;
        font-weight: 200;
        margin-bottom: 10px;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        -webkit-appearance:none;
        -moz-appearance: none;
        text-indent: 1px;
    }
    .select:focus{ outline: none;}
</style>