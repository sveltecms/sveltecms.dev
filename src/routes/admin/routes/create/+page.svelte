<script lang="ts">
    import type { ElementData, RouteLoad } from "cms/types"
    import type { CreateRouteFunc } from "cms/funcs"
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import Utils from "cms/utils"
    // packages
    import { addToast } from "cms/packages/toasts"
    // components
    import MetaData from "cms/components/shared/MetaData.svelte"
    import PageTitle from "cms/components/shared/PageTitle.svelte"
    import Content from "cms/components/shared/layout/Content.svelte"
    import LeftContent from "cms/components/shared/layout/LeftContent.svelte"
    import Label from "cms/components/shared/Label.svelte"
    import Button from "cms/components/shared/Button.svelte"
    import AddElement from "cms/components/shared/addElement/addElement.svelte"
    import NoResultText from "cms/components/shared/NoResultText.svelte"
    import Elements from "cms/components/shared/elements/Elements.svelte"
    // elements
    import Input from "cms/components/elements/Input.svelte"
    import TextArea from "cms/components/elements/TextArea.svelte"
    // icons
    import CloudPlusIcon from "cms/icons/CloudPlus.svelte"
    let appData = $page.data.appData
    let wasRouteIdClick:boolean = false
    let addingElement:boolean = false
    let loading:boolean = false
    let checkForErrors:boolean = false
    let title:string = ""
    let routeID:string = ""
    let searchAbleKey:string = ""
    let metaTitle:string = ""
    let metaDescription:string = ""
    let elements:ElementData[] = []

    /** Add new route */
    async function createRoute() {
        checkForErrors = true
        loading = true
        const newRouteData:RouteLoad = {
            ID: routeID,title,searchAbleKey,
            meta: { title: metaTitle, description: metaDescription },
            elements,
        }
        const errors = Utils.validateObjectData(newRouteData)
        // if data was validated
        if(errors.length===0){
            const apiLoad:CreateRouteFunc['input'] = { name:"createRoute",data:newRouteData }
            const apiResponse:CreateRouteFunc['output'] = await Utils.fetch("/",apiLoad)
            // if route was created
            if(apiResponse.ok){
                addToast({ type:"ok",msg:apiResponse.msg })
                await Utils.sleep(500)
                // go to routes
                goto(`${appData.config.cmsPath}/routes`)
            }
            // else if user was not created
            else{ addToast({ type:"error",msg:apiResponse.msg }) }
        }
        // show error message
        else addToast({ type:"error",msg:errors[0] })
        await Utils.sleep(500)
        // reset stages
        loading = false
    }

    /** Auto add title as id, this only run if id input was not clicked before */
    function autoRouteID(e:any){
        if(!wasRouteIdClick) routeID=title.toLowerCase()
    }
</script>

<MetaData title="Create route"/>
<PageTitle title="Create route" goBackHref="/routes"/>
<AddElement bind:open={addingElement} bind:elements/>
<Content>
    <LeftContent>
        <Label text="Route data" />
        <Input placeholder="route title..." bind:value={title} on:keyup={autoRouteID} error={checkForErrors && !title.trim()}/>
        <Input placeholder="route id..." bind:value={routeID} on:keyup={()=>wasRouteIdClick=true} error={checkForErrors && !routeID.trim()}/>
        <Label text="Key to search objects" />
        <Input placeholder="searchAbleKey..." bind:value={searchAbleKey} error={checkForErrors && !searchAbleKey.trim()}/>
        <Label text="Route meta data" />
        <Input placeholder="title..." bind:value={metaTitle} error={checkForErrors && !metaTitle.trim()}/>
        <TextArea placeholder="description..." bind:value={metaDescription} error={checkForErrors && !metaDescription.trim()}/>
        <Label text="Route elements" btnText="Add element" on:click={()=>addingElement=true}/>
        {#if elements.length===0}
            <NoResultText title="No elements" subTitle="Please add one element" error={checkForErrors && elements.length===0}/>
        {:else}
            <Elements bind:elements/>
        {/if}
        <Button {loading} text="Create route" icon={CloudPlusIcon} on:click={createRoute}/>
    </LeftContent>
</Content>