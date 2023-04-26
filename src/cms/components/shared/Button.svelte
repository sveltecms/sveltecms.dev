<script lang="ts">
    export let red:boolean = false
    export let full:boolean = true
    /** Text inside button */
    export let text:string
    /** When true it will show a loading spinner */
    export let loading:boolean = false
    /** Optional you can pass an icon component to display inside button */
    export let icon:undefined|any = undefined
    /** Center button */
    export let centerBtn:boolean = false
    export let circle:boolean = false
    export let margin:string = "0 0 10px 0"
    // COMPS
    import Spinner from "cms/components/shared/Spinner.svelte";
</script>

<div class="wrap" class:centerBtn class:red class:full>
    <button on:click class:circle class:loading={loading} disabled={loading} style:margin>
        {#if loading}<Spinner />{/if}
        {#if icon && !loading}
            <div class="icon">
                <svelte:component this={icon}/>
            </div>
        {/if}
        {text}
        <slot />
    </button>
</div>

<style lang="scss">
    button{
        color: var(--buttonColor);
        background-color: var(--buttonBg);
        width: var(--width);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 5px;
        padding: 15px 50px;
        font-size: 13px;
        font-weight: 600;
        box-shadow: var(--boxShadow2);
        text-transform: uppercase;
        position: relative;
        // Hover
        transition: transform ease-in-out 0.2s;
        &:hover{ transform: scale(1.01); }
    }
    // When set for center button
    .centerBtn{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--buttonColor);
        margin-right: 5px;
    }
    // When loading
    button.loading{
        cursor: not-allowed;
        opacity: 80%;
    }
    .red button{ background-color: #5e4545; color: white;}
    .full, button{ width: 100%; }
    .circle{ border-radius: 50px;}
    // Mobile
    @media(max-width:700px){
        button:hover{ transform: scale(1.02) }
    }
</style>