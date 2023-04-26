<script lang="ts">
    export let open:boolean
    export let asset:AssetData
    export let updating:boolean
    export let deleting:boolean
    import type { AssetData } from "cms/types"
    import { createEventDispatcher } from "svelte";
    import PopUpBox from 'cms/components/shared/PopUpBox.svelte';
    import ImagePreview from "cms/components/shared/ImageViewer.svelte";
    import Input from "cms/components/elements/Input.svelte";
    import Label from "cms/components/elements/Label.svelte";
    import Button from "cms/components/shared/Button.svelte"
    import Confirm from "cms/components/shared/Confirm.svelte";
    let showConfirmation:boolean = false
    const dispatch = createEventDispatcher()
    function handleConfirmation(e:any){
        if(e.detail){
            dispatch("delete")
            showConfirmation = false
        }
    }
</script>

<PopUpBox bind:open>
    <Label text="Title"/>
    <Input bind:value={asset.title} placeholder="asset title..."/>
    <ImagePreview {asset}/>
    <div class="flex">
        <Button text="Update" full loading={updating} on:click={()=>dispatch("update")}/>
        <Button text="Delete" red full loading={deleting} on:click={()=>showConfirmation=!showConfirmation}>
            {#if showConfirmation}
                <Confirm on:confirm={handleConfirmation}/>  
            {/if}
        </Button>
    </div>
</PopUpBox>

<style>
    .flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
</style>