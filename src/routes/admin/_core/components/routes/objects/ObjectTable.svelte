<script lang="ts">
    export let object:ObjectData = []
    import type { ObjectData } from "$Types";
    import JsonIcon from "$Icons/Json.svelte";
    import EyeSlashIcon from "$Icons/EyeSlash.svelte"
</script>

<div class="table">
    {#each Object.entries(object) as [objectKey,objectValue]}
        {@const valueType = typeof objectValue}
        {#if !objectKey.startsWith("_")}
            <div class="row">
                <span class="rowName">{objectKey}</span>
                <span class="rowValue">
                    {#if objectKey.includes("password")}
                        <EyeSlashIcon />
                    {:else if valueType==="object"}
                        <JsonIcon />
                    {:else if valueType==="string"}
                        {objectValue.substring(0,70)}
                        {#if objectValue.length>=70}...{/if}
                    {:else}
                        {objectValue}
                    {/if}
                </span>
            </div>
        {/if}
    {/each}
</div>

<style>
    .table{
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        padding: 5px 10px;
        border-radius: 20px;
        background-color: rgba(0,0,0,.1);
    }
    .row{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgba(0,0,0,5%);
        box-shadow: var(--boxShadow2);
        margin: 5px 0;
        padding: 10px 15px;
        border-radius: 20px;
    }
    .rowName{
        font-size: 20px;
        font-weight: 700;
        color: var(--textColor);
        margin-right: 10px;
    }
    .rowValue{
        font-size: 20px;
        font-weight: 100;
        color: var(--textColor);
        fill: var(--textColor);
    }
    /* Mobile */
    @media(max-width:700px){
        .rowName{
            font-weight: 600;
        }
        .rowName,.rowValue{
            font-size: 17px;
        }
    }
</style>