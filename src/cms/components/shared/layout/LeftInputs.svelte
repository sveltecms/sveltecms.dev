<script lang="ts">
    export let element:ElementData
    export let checkForErrors:boolean
    import type { ElementData,AssetData, RouteObjectData } from "cms/types";
    import Utils from "cms/utils";
    import { ROUTE_OBJECT } from "cms/lib/stores"
    // elements
    import Input from "cms/components/elements/Input.svelte"
    import TextArea from "cms/components/elements/TextArea.svelte"
    import InputNumber from "cms/components/elements/InputNumber.svelte";
    import ContentEditor from "cms/packages/editor/Editor.svelte"
    // components
    import Label from "cms/components/shared/Label.svelte"
    import Images from "./Images.svelte";
    import FileExplorer from "cms/components/shared/fileExplorer/fileExplorer.svelte";
    import LinkedObjects from "cms/components/shared/linkedObjects/Objects.svelte";
    import SearchRouteObjects from "cms/components/shared/linkedObjects/Search.svelte";
    let show:boolean = !["asset","dateTime","boolean"].includes(element.type)
    let showSearchObjects:boolean = false
    let btnText:string = element.type==="slug" ? "Generate" : element.type==="assets" ? "Select file" : element.type==="linkToRoute" ? "Select" : ""
    let btnLink = element.type==="linkToRoute" ? {href:`/routes/${element.linkTo}/new-object`,text:`Create ${element.linkTo}`} : undefined
    
    let showFileExplorer:boolean = false
    $: error = checkForErrors && !element.value

    /** handle file explorer */
    function handleFileExplorer(e:any){
        const asset:AssetData = e.detail
        // if element value is null, set it to an array
        if(!element.value) element.value = []
        // set asset to element value / array
        const assetInList = element.value.find((data:any)=>data._id===asset._id)
        // only run if asset do not exists in current element value / array
        if(!assetInList) element.value = [...element.value,asset]
    }

    /** Handle label button click */
    function handleLabelClick(){
        if(element.type==="slug"){
            const nearInputElement = $ROUTE_OBJECT.elements.find((data:any)=>data.type="input")
            element.value = Utils.generateSlug(nearInputElement?.value)
        }
        // Search linked route objects
        else if(element.type==="linkToRoute"){
            // if element value is not an array, covert it to array
            if(!Array.isArray(element.value)) element.value = []
            // show or close object search
            showSearchObjects = !showSearchObjects
        }
        // Else open file explorer
        else showFileExplorer = true
    }

    /** Add new linked object */
    function addLinkedObject(e:any){
        const newObject:RouteObjectData = e.detail
        const objectExists = element.value.find((data:any)=>data._id===newObject._id)
        // if object do not exists in objects list
        if(!objectExists){
            element.value = [newObject,...element.value]
        }
    }

    /** Remove linked object */
    function removeLinkedObject(e:any){
        const objectData:RouteObjectData = e.detail
        const newObjectsList:RouteObjectData[] = element.value.filter((data:any)=>data._id!==objectData._id)
        element.value = [...newObjectsList]
    }
</script>

<FileExplorer bind:open={showFileExplorer} on:selectAsset={handleFileExplorer}/>
{#if show}
    <Label text={element.title} {btnText} on:click={handleLabelClick} link={btnLink} {error} />
    {#if element.type==="input"}
        <Input placeholder={`${element.ID}...`} bind:value={element.value} {error}/>
    {:else if element.type==="inputNumber"}
        <InputNumber placeholder={`${element.ID}...`} bind:value={element.value} {error}/>
    {:else if element.type==="slug"}
        <Input placeholder={`${element.ID}...`} bind:value={element.value} {error}/>
    {:else if element.type==="textArea"}
        <TextArea placeholder={`${element.ID}...`} bind:value={element.value} {error}/>
    {:else if element.type==="content"}
        <ContentEditor bind:data={element.value} />
    {:else if element.type==="assets" && element.value.length>0}
        <Images bind:images={element.value}/>
    {:else if element.type==="linkToRoute"}
        {#if showSearchObjects}
            <SearchRouteObjects bind:element on:addObject={addLinkedObject}/>
        {/if}
        {#if element.value.length>0}
            <LinkedObjects {element} objects={element.value} on:deleteObject={removeLinkedObject}/>
        {/if}
    {/if}
{/if}
