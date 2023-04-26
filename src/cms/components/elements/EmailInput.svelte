<script lang="ts">
    /** This input in DOM */
    export let element:any = undefined
    /** Input value, make sure to bind it (bind:value) */
    export let value:string
    /** Input placeholder */
    export let placeholder:string 
    /** Optional you can pass an icon component to display inside button */
    export let icon:any = undefined
    /** Change background when error */
    export let error:boolean = false
</script>

<div class="wrapper">
    <input type="email" {placeholder} class:error bind:value={value} bind:this={element} on:keyup>
    {#if icon}
        <div class="icon">
            <svelte:component this={icon}/>
        </div>
    {/if}
</div>

<style lang="scss">
    $color: var(--textColor);
    .wrapper{
        width: 100%;
        position: relative;
    }
    input{
        padding: 10px;
        margin-bottom: 20px;
        width: 100%;
        height: fit-content;
        border: none;
        font-weight: 400;
        border-radius: 5px;
        background-color: var(--antiBodyBg);
        color: var(--textColor);
        &:focus{ outline: none; }
        transition: background-color 0.3s;
        box-shadow: var(--boxShadow2);
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    /* input { -moz-appearance: textfield; } */
    input.error{
        background-color: #c4727254;
        color: white;
        &::placeholder{ color: white;}
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 10px;
        top: calc(50% - 10px);
        transform: translateY(-50%);
        fill: $color;
    }
</style> 