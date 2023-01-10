<script lang="ts">
    export let text:string
</script>

<div class="setting">
    <span class="name">{text}</span>
    <slot />
</div>

<style>
    .setting{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--antiBodyBg);
        color: var(--textColor);
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        box-shadow: var(--boxShadow2);
    }
    .name{
        font-size: 18px;
        font-weight: 200;
    }
</style>