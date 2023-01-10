<script lang="ts">
    export let tag:TagData
    import type { TagData } from "$Types"
    import TagIcon from "$Icons/Tags.svelte"
    import ActionsButtons from "./ActionsButtons.svelte";
    import Icon from "$Comps/Icon.svelte";
</script>

<div class="tag">
    <Icon icon={TagIcon}/>
    <span class="name">{tag.name}</span>
    <ActionsButtons {tag} on:delete />
</div>

<style lang="scss">
    .tag{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding:7px 10px;
        margin-bottom: 15px;
        background-color: var(--antiBodyBg);
        box-shadow: var(--boxShadow);
        border-radius: 5px;
    }
    .name{
        font-size: 17px;
        font-weight: 300;
        margin-right: 10px;
        color: var(--textColor);
        flex: 1;
    }
</style>