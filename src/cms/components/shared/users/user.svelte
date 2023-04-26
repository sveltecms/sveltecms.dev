
<script lang="ts">
    export let showDel:boolean
    export let user:UserData
    import type { UserData } from "cms/types"
    import { createEventDispatcher } from "svelte"
    import { page } from "$app/stores"
    import { fade } from "svelte/transition";
    import Confirm from "cms/components/shared/Confirm.svelte"
    const dispatch = createEventDispatcher()
    let appData = $page.data.appData
    let href:string = `${appData.config.cmsPath}/users/edit/${user._id}`
    let showConfirm:boolean = false
    /** Hide or show confirmation */
    function toggleConfirm(){
        showConfirm = !showConfirm
    }
</script>

<div class="user" in:fade>
    <div class="image">
        <img src={user.image.src} alt={user.firstName}>
        <h2 class="title">{user.email}</h2>
    </div>
    <div class="actions">
        {#if showConfirm}
            <Confirm on:click={toggleConfirm} on:confirm={ (e)=>{if(e.detail){dispatch("delete",user)}} }/>
        {/if}
        <a data-sveltekit-preload-data {href} class="action">EDIT</a>
        {#if showDel}
            <button class="action bad" on:click={toggleConfirm}>
                {#if showConfirm} Cancel {:else} DELETE {/if}
            </button>
        {/if}
    </div>
</div>

<style lang="scss">
    .user{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: calc(100% / 6 - 17px);
        border-radius: 5px;
        overflow: hidden;
        box-shadow: var(--boxShadow2);
        background-color: var(--antiBodyBg);
    }
    .image {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
    .title{
        position: absolute;
        bottom: 0; left: 0;
        padding: 5px;
        width: 100%;
        font-size: 15px;
        font-weight: 400;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        color: var(--textColor);
    }
    .actions{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 5px;
        position: relative;
    }
    .action{
        flex: 1;
        border: none;
        cursor: pointer;
        color: var(--buttonColor);
        background-color: var(--buttonBg);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        padding: 8px 0;
        font-size: 10px;
        font-weight: 400;
        box-shadow: var(--boxShadow2);
        text-transform: uppercase;
        &.bad{
            background-color: #a86868;
        }
    }
    @media(max-width:1000px){
        .user{
            width: calc(100% / 4 - 17px);
        } 
    }
    @media(max-width:700px){
        .user{
            width: calc(100% / 2 - 5px);
        } 
    }
</style>