<script lang="ts">
    export let toast:ToastData
    import { fly } from "svelte/transition";
    // import toast store
    import { TOASTS, type ToastData  } from "./index";
    // import icons
    import TrashIcon from "./icons/trash.svelte";
    import ErrorIcon from "./icons/error.svelte"
    import SuccessfulIcon from "./icons/ok.svelte"
    import NeutralIcon from "./icons/neutral.svelte"
    // remove when click remove
    function removeItem(){
        $TOASTS = $TOASTS.filter(data=>data.id!==toast.id)
    }
</script>

<div class="toast {toast.type}" in:fly="{{ duration:500, x:40 }}" out:fly="{{ duration:500, x:-40 }}">
    <div class="remove" on:keydown on:click={removeItem}>
        <TrashIcon size=15/>
    </div>
    <div class="flex">
        <div class="icon">
            {#if toast.type === 'error'}
                <ErrorIcon size=15/>
            {:else if toast.type === 'ok'}
                <SuccessfulIcon size=15/>
            {:else}
                <NeutralIcon size=15/>            
            {/if}
        </div>
        <span class="title">
            {toast.title?toast.title:toast.type}
        </span>
    </div>
    <span class="msg">
        {toast.msg}
    </span>
</div>

<style>
    .toast{
        border-radius: 5px;
        padding: 10px 80px 10px 15px ;
        color: white;
        margin-bottom: 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
    .toast.error{ background-color: rgb(219, 109, 109); }
    .toast.ok{ background-color: #079E6D; }
    .toast.neutral{ background-color: #364152; }
    .remove{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%; transform: translateY(-50%);
        right: 10px;
        background-color: rgba(0, 0, 0, 0.2);
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
        fill: white;
        padding: 5px;
        border-radius: 50%;
    }
    .flex{
        display: flex;
        align-items: center;
        fill: white;
        margin-bottom: 2px;
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .title{
        font-size: 15px;
        font-weight: 800;
        text-transform: uppercase;
        color: white;
        margin-left: 5px;
    }
    .msg{
        font-size: 13px;
        font-weight: 400;
        color: white;
    }
</style>