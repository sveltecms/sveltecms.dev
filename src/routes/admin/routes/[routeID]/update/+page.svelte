<script lang="ts">
    export let data:PageData
    import type { PageData } from "./$types"
    import type { ElementData, RouteData } from "cms/types"
    import type { UpdateRouteFunc } from "cms/funcs"
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
    import CloudIcon from "cms/icons/Cloud.svelte"
    let appData = $page.data.appData
    let wasRouteIdClick:boolean = true
    let addingElement:boolean = false
    let loading:boolean = false
    let checkForErrors:boolean = true
    let title:string = data.route.title
    let routeID:string = data.route.ID
    let searchAbleKey:string = data.route.searchAbleKey

    let metaTitle:string = data.route.meta.title
    let metaDescription:string = data.route.meta.description
    let elements:ElementData[] = data.route.elements

    /** Update route */
    async function updateRoute() {
        checkForErrors = true
        loading = true
        const newRouteData:RouteData = {
            _id:data.route._id,searchAbleKey,
            ID: routeID,title,
            meta: { title: metaTitle, description: metaDescription },
            elements,
        }
        const errors = Utils.validateObjectData(newRouteData)
        // if data was validated
        if(errors.length===0){
            const apiLoad:UpdateRouteFunc['input'] = { name:"updateRoute",data:newRouteData }
            const apiResponse:UpdateRouteFunc['output'] = await Utils.fetch("/",apiLoad)
            // if route was created
            if(apiResponse.ok){
                await Utils.sleep(500)
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
        // reset stages
        await Utils.sleep(500)
        loading = false
    }

    /** Auto add title as id, this only run if id input was not clicked before */
    function autoRouteID(e:any){
        if(!wasRouteIdClick) routeID=title.toLowerCase()
    }
</script>

<MetaData title={`Updating ${routeID}`}/>
<PageTitle title={`Updating ${routeID}`} goBackHref="/routes"/>
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
        <Button {loading} text="Save changes" icon={CloudIcon} on:click={updateRoute}/>
    </LeftContent>
</Content>