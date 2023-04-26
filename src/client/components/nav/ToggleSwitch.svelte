<script lang="ts">
    export let checked:boolean
    // Icons
    import DarkMode from "client/icons/DarkMode.svelte";
    import LightMode from "client/icons/LightMode.svelte";
    // Switch dark and light mode
    function handleClick(){ checked = !checked }
</script>

<div class="mode" class:checked on:click={handleClick} on:keydown={handleClick}>
    <div class="icon">
        {#if checked}
            <DarkMode size=11/>
        {:else}
            <LightMode size=11/>
        {/if}
    </div>
</div>

<style lang="scss">
    $width: 50px;
    .mode{
        cursor: pointer;
        width: $width;
        height: calc($width / 2 + 5px);
        background: #65676b;
        display: flex;
        align-items: center;
        border-radius: 100px;
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        fill: rgb(33, 33, 33);
        background-color: rgba(255, 255, 255, 0.9);
        padding: 5px;
        border-radius: 50%;
        margin: 5px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
        transform: translateX(0);
        transition: transform ease-in-out 0.2s, background-color ease 0.2s;
    }
    // When checked
    .mode.checked > .icon{
        background-color: rgba(0, 0, 0, 0.9);
        transform: translateX(calc($width / 2 - 3px));
        fill: white;
    }
</style>