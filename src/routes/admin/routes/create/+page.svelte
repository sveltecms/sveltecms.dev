<script lang="ts">
    const API_PATH = "/admin/api/routes"
    let checkForErrors:boolean = false
    let publishing:boolean = false
    const routeData:RouteData|RouteLoad = {
        ID:"", title:"", includeCategories:"yes", includeTags:"yes",
        meta: { title: "",description: "" },elements: []
    }
    $: errorOnField = {
        ID: checkForErrors && routeData.ID.trim().length===0,
        title: checkForErrors && routeData.title.trim().length===0,
        meteTitle: checkForErrors && routeData.meta.title.trim().length===0,
        metaDescription: checkForErrors && routeData.meta.description.trim().length===0,
        emptyElements: checkForErrors && routeData.elements.length===0
    }
    // Types
    import type { RouteLoad, RouteData, ElementData,ApiRouteCreateLoad, ApiRouteCreateData } from "$Types"
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    // SVELTE
    import { goto } from "$app/navigation";
    // STORES
    import { ROUTES } from "$Stores"
    // Utils
    import { wait,fetchPost,validateRoute } from "$Utilities";
    // Icons
    import SaveIcon from "$Icons/Globe.svelte"
    // Packages
    import { newToast } from "@anthony809/svelte-toasts/index";
    // Components
    import PageTitleLink from "$Comps/PageTitleLink.svelte";
    // Elements comps
    import Label from "$Elements/Label.svelte";
    import LabelSelector from "$Elements/LabelSelector.svelte";
    import Textarea from "$Elements/Textarea.svelte";
    import Input from "$Elements/Input.svelte";
    import Button from "$Comps/Button.svelte";
    import Elements from "$Comps/routes/newRoute/elements/Elements.svelte";
    import ElementEditor from "$Comps/routes/newRoute/ElementEditor.svelte";
    // Route comps
    import Content from "$Comps/routes/Content.svelte";
    import RightContent from "$Comps/routes/RightContent.svelte";
    import LeftContent from "$Comps/routes/LeftContent.svelte";

    /** Add new element to route's elements */
    function addNewElement(e:any){
        const element:ElementData = {...e.detail}
        const elementExists = routeData.elements.find(data=>data.ID===element.ID)
        // Add element if it do not exists
        if(!elementExists){ routeData.elements = [...routeData.elements,element] }
        // Else send alert
        else newToast({type:"error",msg:`Element ID:${element.ID} already exists`})
    }

    /** Publish new route */
    async function publish() {
        checkForErrors = true // Set check for empty fields
        publishing = true // Set spinner for publish button
        // Send request
        const validatorErrors = validateRoute(routeData)
        const validated = validatorErrors.length === 0
        if(validated){
            const apiData:ApiRouteCreateLoad = routeData
            const apiResponse:ApiRouteCreateData = await fetchPost("PUT",API_PATH,apiData)
            // If route was created
            if(apiResponse.ok){
                newToast({ type:"ok",msg:apiResponse.msg })
                ROUTES.set([...$ROUTES,apiResponse.routeData])
                await wait(1000)
                goto("/admin/routes")
            }
            // If route was not created, throw error msg
            else newToast({ type:"error",msg:apiResponse.msg })
        }
        else newToast({ type:"error",msg:validatorErrors[0].msg })
        await wait(1000) // Wait 1 second before removing spinner and
        publishing = false // Remove spinner for publish button
    }
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Create route",
        description:svelteCMS.site.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
<PageTitleLink href="/admin/routes" linkText="All routes" title="Adding route" goBackSrc="/admin/routes"/>
<Content>
    <LeftContent>
        {#if !routeData._id}
            <Label text="ID" error={errorOnField.ID}/>
            <Input placeholder="Route id..." bind:value={routeData.ID} />
        {/if}
        <Label text="Title" error={errorOnField.title} />
        <Input placeholder="Route title..." bind:value={routeData.title} />
        <Label text="Page info" error={errorOnField.meteTitle}/>
        <Input placeholder="Page title..." bind:value={routeData.meta.title} />
        <Textarea placeholder="Page description..." bind:value={routeData.meta.description} />
        <Label text="Route elements" error={errorOnField.emptyElements}/>
        <Elements bind:elements={routeData.elements}/>
    </LeftContent>
    <RightContent>
        <ElementEditor error={errorOnField.emptyElements} on:change={addNewElement}/>
        <LabelSelector bind:value={routeData.includeCategories} text="Add categories" options={["yes","no"]}/>
        <LabelSelector bind:value={routeData.includeTags} text="Add tags" options={["yes","no"]}/>
        <Button text="Add Route" icon={SaveIcon} bind:loading={publishing} on:click={publish}/>   
    </RightContent>
</Content> 