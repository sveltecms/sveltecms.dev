<script lang="ts">
    export let value:"public"|"private"
    // Icons
    import PrivateIcon from "$Icons/Incognito.svelte"
    import PublicIcon from "$Icons/Globe.svelte"
    // Change post status
    function changeStatus(status:"public"|"private"){
        value = status
    }
</script>

<div class="status">
    <span class:active={value==="public"} on:click={()=>changeStatus("public")}>Public<PublicIcon size=15/></span>
    <span class:active={value==="private"} on:click={()=>changeStatus("private")}>Private<PrivateIcon size=15/></span>
</div>

<style>
    .status{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    span{
        cursor: pointer;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--buttonBg);
        color: var(--buttonColor);
        fill: rgba(255, 255, 255, 0.5);
        border-radius: 20px;
        padding: 7px 15px;
        font-size: 13px;
        font-weight: 600;
    }
    span:first-child{  margin-right: 10px; }
    span.active,span:hover{
        box-shadow: 0 0 0px 2px rgba(255, 255, 255, 0.5);
    }
</style>