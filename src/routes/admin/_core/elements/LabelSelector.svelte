<script lang="ts">
    /** Label text */
    export let text:string
    /** List of options to show */
    export let options:string[]
    /** Binded value to the select div */
    export let value:string
</script>

<div class="label">
    {text}
    <select bind:value>
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
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
        &::before{
            content: "";
            position: absolute;
            left: -15px;
            height: 100%;
            width: 4px;
            border-radius: 4px;
            background-color: #066a9b40;
        }
    }
    select{
        cursor: pointer;
        text-transform: uppercase;
        border: none;
        padding: 7px 15px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        background-color: var(--buttonBg2);
        color: var(--buttonColor);
        fill: var(--buttonColor);
        box-shadow: var(--boxShadow);
        -webkit-appearance:none;
        -moz-appearance: none;
        text-indent: 1px;
        // Hover
        transition: transform 0.3s ease-in-out;
        &:hover{ transform: scale(1.05)}
        &:focus{
            outline: none;
            transform: scale(1.05)
        }
    }
</style>