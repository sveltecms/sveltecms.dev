<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
</script>

<div class="confirmDelete">
    <button on:click={()=>dispatch('click',true)}>
        Confirm
    </button>
    <button on:click={()=>dispatch('click',false)}>
        Cancel
    </button>
</div>

<style lang="scss">
    .confirmDelete{
        position: absolute;
        right: calc(100% + 10px);
        top: 50%; transform: translateY(-50%);
        display: flex;
        align-items: center;
        background-color: var(--bodyBg);
        padding: 15px;
        border-radius: 5px;
        box-shadow: var(--boxShadow2);
        button{
            cursor: pointer;
            padding: 10px 15px;
            font-size: 13px;
            font-weight: 600;
            color: white;
            border-radius: 5px;
            border: none;
            &:nth-child(1){
                margin-right: 5px;
                background-color: #cc7d7d;
            }
            &:nth-child(2){
                margin-left: 5px;
                background-color: #4f4f4f;
            }
        }
    }
</style>