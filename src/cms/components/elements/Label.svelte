<script lang="ts">
    /** Label text */
    export let text:string
    /** If button text was passed, it will us btnText as button text */
    export let btnText:string = ''
    /** Indicate if there is an error that need attention */
    export let error:boolean = false
</script>

<div class="label" class:error>
    {text}
    {#if btnText}
        <button on:click>{btnText}</button>
    {/if}
    <slot />
</div>

<style lang="scss">
    .label{
        margin:0 0 15px 15px;
        color: var(--textColor);
        font-size: 18px;
        font-weight: 400;
        position: relative;
        text-transform: capitalize;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-transform: uppercase;
        &::before{
            content: "";
            position: absolute;
            left: -15px;
            height: 100%;
            width: 4px;
            border-radius: 4px;
            background-color: #066a9b40;
            
        }
        &.error::before{
            background-color: rgba(196, 114, 114, 0.3294117647);
            animation: errorShake 0.5s;
            @keyframes errorShake {
                0%{
                    left:-15px;
                    background-color: rgba(255, 0, 0, 0.742);
                }
                40%{ left:-18px }
                60%{ left:-13px }
                80%{ left:-16.5px }
                100%{
                    left:-15px;
                    background-color: rgba(196, 114, 114, 0.3294117647);
                }
            }
        }
    }
    button{
        cursor: pointer;
        text-transform: uppercase;
        border: none;
        padding: 5px 10px;
        border-radius: 50px;
        font-size: 13px;
        font-weight: 400;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        fill: var(--buttonColor);
        box-shadow: var(--boxShadow);
        display: flex;
        align-items: center;
        // Hover
        transition: transform 0.3s ease-in-out;
        &:hover{ transform: scale(1.05)}
    }
</style>