<script lang="ts">
    export let user:UserData
    import type { UserData } from "$Types"
    import svelteCMS from "$svelteCMS";
    import ActionsButtons from "./ActionsButtons.svelte";
    $: imageSrc = `${svelteCMS.urlBases.assets}/images/${user.image.path}`
</script>

<div class="user">
    <div class="image">
        <img src={imageSrc} alt={user.firstName}>
    </div>
    <span class="name">{user.firstName}</span>
    <ActionsButtons {user} on:delete/>
</div>

<style lang="scss">
    .user{
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
    .image{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 15px;
        box-shadow: var(--boxShadow2);
        img{
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
    .name{
        font-size: 17px;
        font-weight: 300;
        margin-right: 10px;
        color: var(--textColor);
        flex: 1;
    }
</style>