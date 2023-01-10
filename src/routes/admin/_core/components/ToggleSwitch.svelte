<script lang="ts">
    export let checked:boolean
    /** Handle toggle click
     * If checked, it will change to unchecked
     * Or if unchecked, it will change to checked */
    function handleClick(){ checked = !checked }
</script>

<label for="switch" class:checked on:click={handleClick}>
    Toggle
</label>

<style lang="scss">
    $width: 60px;
    $bg: var(--buttonBg);
    label {
        cursor: pointer;
        text-indent: -9999px;
        width: $width;
        height: calc($width / 2);
        background: #65676b;
        display: block;
        border-radius: 100px;
        position: relative;
        transition: background ease-in-out 0.2s;
        // When checked
        &.checked { background: $bg; }
        &.checked::after {
            transform: translateX(calc(100% + 10px));
        }
    }
    label:after {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        width: calc($width / 3);
        height: calc($width / 3);
        background: #fff;
        border-radius: 50%;
        transform: translateX(0%);
        transition: transform ease-in-out 0.2s;
    }
</style>