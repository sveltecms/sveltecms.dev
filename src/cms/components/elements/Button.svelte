<script lang="ts">
    /** Text inside button */
    export let text:string = "publish"
    /** When true it will show a loading spinner */
    export let loading:boolean = false
    /** Optional you can pass an icon component to display inside button */
    export let icon:undefined|any = undefined
    // COMPS
    import Spinner from "cms/components/shared/Spinner.svelte";
</script>

<button on:click class:loading={loading} disabled={loading}>
    {#if loading}<Spinner />{/if}
    {#if icon && !loading}
        <div class="icon">
            <svelte:component this={icon}/>
        </div>
    {/if}
    {text}
</button>

<style lang="scss">
    $width: var(--width,100%);
    $color: var(--color,var(--buttonColor));
    $bg: var(--color,var(--buttonBg));
    button{
        color: $color;
        background-color: $bg;
        width: $width;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 50px;
        padding: 15px 50px;
        font-size: 13px;
        font-weight: 600;
        box-shadow: var(--boxShadow2);
        text-transform: uppercase;
        margin-bottom: 10px;
        // Hover
        transition: transform ease-in-out 0.2s;
        &:hover{ transform: scale(1.01); }
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        fill: $color;
        margin-right: 5px;
        background-color: rgba(0,0,0,.1);
        border-radius: 50%;
    }
    // When loading
    button.loading{
        cursor: not-allowed;
        opacity: 80%;
    }
    // Mobile
    @media(max-width:700px){
        button:hover{ transform: scale(1.02) }

    }
</style>