<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
</script>

<div class="confirmDelete">
    <button on:click={()=>dispatch('confirm')}>
        Confirm
    </button>
</div>

<style>
    .confirmDelete{
        position: absolute;
        right: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        background-color: var(--bodyBg);
        padding: 5px 10px;
        border-radius: 5px;
        box-shadow: var(--boxShadow2);
    }
    button{
        cursor: pointer;
        padding: 10px 15px;
        font-size: 13px;
        font-weight: 600;
        color: white;
        border-radius: 5px;
        border: none;
        background-color: #cc7d7d;
    }
</style>