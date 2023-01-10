<script lang="ts">
    /** Use to change background to red when error */
    export let error:boolean = false
    /** Default data for element */
    export let elementData:ElementData = {ID: "",name: "", type: "input",value: "string" }
    // Types
    import type { ElementData, ElementType } from "$Types"
    import { validateElement } from "$Utilities"
    // Packages
    import { newToast } from "@anthony809/svelte-toasts/index";
    // Icons
    import PlusIcon from "$Icons/Plus.svelte";
    // Elements
    import Label from "$Elements/Label.svelte";
    import Input from "$Elements/Input.svelte";
    import Button from "$Comps/Button.svelte";
    import SelectOption from "$Elements/SelectOption.svelte";
    import { createEventDispatcher } from "svelte"
    /** Reset element editor's values */
    function resetValues(){
        elementData = { ID: "",name: "", type: "input",value: "string" }
        IDerror = false
        nameError = false
        checkError = false
    }
    /** Handle new element or update */
    function handleElementUpdate(){
        checkError = true
        /** Validate element */
        const validated = validateElement(elementData)
        if(validated===true){
            dispatch("change",elementData)
            resetValues()
        }else{
            newToast({type:"error",msg:validated.msg})
            return
        }
    }
    // Variables 
    const dispatch = createEventDispatcher()
    $: IDerror = checkError && elementData.ID.trim().length===0
    $: nameError = checkError && elementData.name.trim().length===0
    /** Indicate if we are showing editor or not */
    let showElementEditor:boolean = false
    /** Indicate to show error */
    let checkError:boolean = false 
    const elementTypes:ElementType[] = [ "dateTime", "textArea", "input", "inputNumber", "slug", "content", "image" ]
</script>

<div class="elementEditor" class:error>
    <Label {error} text="Add Element" btnText={showElementEditor?"Close":"Add"} on:click={()=>showElementEditor=!showElementEditor}/>
        {#if showElementEditor}
            <Input placeholder="Element  id..." bind:value={elementData.ID} error={IDerror} --antiBodyBg="var(--bodyBg)"/>
            <Input placeholder="Element  title..." bind:value={elementData.name} error={nameError} --antiBodyBg="var(--bodyBg)"/>
            <Label text="Element type"/>
            <SelectOption options={elementTypes} bind:value={elementData.type}/>
            <Button text="Add element" icon={PlusIcon} on:click={handleElementUpdate}/>
        {/if}
</div>

<style>
    .elementEditor{
        border-bottom: 1px solid #2e3239;
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>