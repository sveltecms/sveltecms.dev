<script lang="ts">
    export let top:boolean = true
    export let centerL:boolean = false
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
</script>

<div class="confirm" class:top class:centerL>
    <button on:click={()=>dispatch('confirm',true)} on:click>
        Confirm
    </button>
    <button on:click={()=>dispatch('confirm',false)} on:click>
        Cancel
    </button>
</div>

<style lang="scss">
    .confirm{
        position: absolute;
        right: calc(100% + 10px);
        top: 50%; transform: translateY(-50%);
        display: flex;
        align-items: center;
        background-color: var(--bodyBg);
        padding: 10px;
        border-radius: 5px;
        box-shadow: var(--boxShadow2);
        button{
            cursor: pointer;
            padding: 5px 10px;
            font-size: 13px;
            font-weight: 400;
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
    .confirm.top{
        right: 0;
        top: -30px;
    }
    .confirm.centerL{
        top: 50%;
        right: calc(100% + 10px);
    }
</style>