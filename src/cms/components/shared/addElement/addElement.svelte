<script lang="ts">
    export let open:boolean
    export let elements:ElementData[] = []
    import type { ElementType,ElementData, RouteData } from "cms/types"
    import type { GetRoutesFunc } from "cms/funcs"
    import Utils from "cms/utils"
    // packages
    import { addToast } from "cms/packages/toasts"
    // components
    import PopUpBox from 'cms/components/shared/PopUpBox.svelte';
    import Input from "cms/components/elements/Input.svelte";
    import Label from "cms/components/elements/Label.svelte";
    import Button from "cms/components/shared/Button.svelte"
    import Type from "./type.svelte";
    import Route from "./route.svelte";
    let checkForErrors:boolean = false
    let title:string = ""
    let id:string = ""
    let currentType:ElementType = "input"
    let wasIdInputClick:boolean = false
    /** Current route ID when linking to route */
    let currentID:string = ""
    let searchableKey:string = ""
    let routes:RouteData[] = []
    $: titleError = checkForErrors && title.trim().length===0
    $: idError = checkForErrors && id.trim().length===0
    $: searchableKeyError = checkForErrors && currentType==="linkToRoute" && searchableKey.trim().length===0
    const types:{title:string,key:ElementType}[] = [
        { title:"🔏 Input",key:"input" },
        { title:"📝 Text",key:"textArea" },
        { title:"🔢 Number",key:"inputNumber" },
        { title:"✨ Boolean",key:"boolean" },
        { title:"📆 Date",key:"dateTime" },
        { title:"🌎 Slug",key:"slug" },
        { title:"📝 Content",key:"content" },
        { title:"🏞️ Asset",key:"asset" },
        { title:"🏞️ Assets",key:"assets" },
        { title:"🔗 LINK TO ROUTE 🔗",key:"linkToRoute" },
    ]
    /** Fetch routes */
    async function setRoutes(){
        const apiLoad:GetRoutesFunc['input'] = { name:"getRoutes",data:{ count:10 }}
        const apiResponse:GetRoutesFunc['output'] = await Utils.fetch("/",apiLoad)
        if(apiResponse.ok){
            routes = [...apiResponse.data]
            currentID = routes[0].ID
        }
    }
    $: if(currentType==="linkToRoute") setRoutes()

    /** try to add any element */
    function addElement(){
        // check for errors
        checkForErrors = true
        titleError = checkForErrors && title.trim().length===0
        idError = checkForErrors && id.trim().length===0
        if(titleError || idError || searchableKeyError || (currentType==="linkToRoute") && currentID.trim().length===0){
            addToast({ type:"error",msg:"Input fields can not be empty" })
            return
        }
        // if element with id exists throw error and stop function
        const elementExists = elements.find(data=>data.ID===id)
        if(elementExists){
            addToast({ type:"error",msg:`Element with id:${id} already exists` }) ; return
        }
        // add new element
        addToast({ type:"ok",msg:`Element:${id} was added` })
        const newElement:ElementData = { title,ID:id,type:currentType,value:"",linkedSearchableKey:searchableKey }
        // It's a linked route
        if(currentType==="linkToRoute") newElement['linkTo'] = currentID
        elements = [...elements,newElement]
        // clear / reset all
        resetAll()
    }

    /** Auto add title as id, this only run if id input was not clicked before */
    function autoMate(){
        if(!wasIdInputClick) id = title.charAt(0).toLowerCase()+title.slice(1).replace(/ /ig,"_")
    }

    /** Reset all inputs and stages */
    function resetAll(){
        checkForErrors = false
        title = ""
        id = ""
        currentType = "input"
        wasIdInputClick = false
        routes = []
        currentID = ""
        searchableKey = ""
    }
</script>

<PopUpBox bind:open on:close={resetAll} on:keydown={(e)=>{if(e.key==="Enter"){ addElement() }}}>
    <Label text="Add element"/>
    <Input bind:value={title} placeholder="Element title..." error={titleError} on:keyup={autoMate}/>
    <Input bind:value={id} placeholder="Element id..." error={idError} on:keyup={()=>wasIdInputClick=true}/>
    {#if currentType==="linkToRoute"}
        <Input bind:value={searchableKey} placeholder={`Searchable key${currentID?` from ${currentID}`:""}...`} error={searchableKeyError}/>
        <div class="routes">
            {#each routes as route}
                <Route bind:currentID ID={route.ID}/>
            {/each}
        </div>
    {/if}
    <div class="types">
        {#each types as type }
            <Type {type} bind:value={currentType}/>  
        {/each}
    </div>
    <Button text="Add" full loading={false} on:click={addElement}/>
</PopUpBox>

<style>
    .types,.routes{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }
</style>