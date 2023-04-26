<script lang="ts">
    export let data:PageData
    import type { PageData } from "./$types"
    import type { CreateObjectFunc } from "cms/funcs"
    import { goto } from "$app/navigation"
    import Utils from "cms/utils"
    import { ROUTE_OBJECT } from "cms/lib/stores"
    // packages
    import { addToast } from "cms/packages/toasts"
    // components
    import MetaData from "cms/components/shared/MetaData.svelte"
    import PageTitle from "cms/components/shared/PageTitle.svelte"
    import Content from "cms/components/shared/layout/Content.svelte"
    import LeftContent from "cms/components/shared/layout/LeftContent.svelte"
    import RightContent from "cms/components/shared/layout/RightContent.svelte";
    import LeftInputs from "cms/components/shared/layout/LeftInputs.svelte"
    import RightInputs from "cms/components/shared/layout/RightInputs.svelte"
    import Button from "cms/components/shared/Button.svelte"
    // icons
    import CloudPlusIcon from "cms/icons/CloudPlus.svelte"
    let routeData = data.routeData
    let appData = data.appData
    let loading:boolean = false
    let checkForErrors:boolean = false

    /** Add new route object */
    async function createObject() {
        checkForErrors = true
        loading = true
        // Validate elements
        const errors = Utils.validateElements(routeData.elements)
        // Add route object
        if(errors.length===0){
            const apiLoad:CreateObjectFunc['input'] = { name:"createObject",data:{ elements:routeData.elements,routeID:routeData.ID } }
            const apiResponse:CreateObjectFunc['output'] = await Utils.fetch("/",apiLoad)
            // if route object was created
            if(apiResponse.ok){
                await Utils.sleep(200)
                addToast({ type:"ok",msg:apiResponse.msg })
                await Utils.sleep(500)
                // go to route objects
                goto(`${appData.config.cmsPath}/routes/${routeData.ID}`)
            }
            // else if user was not created
            else{ addToast({ type:"error",msg:apiResponse.msg }) }

        }
        // show error message
        else addToast({ type:"error",msg:errors[0] })
        // Wait 500 milliseconds
        await Utils.sleep(500)
        // reset stages
        loading = false
    }
    // Update current route object being added
    $: if(data.routeData) $ROUTE_OBJECT = data.routeData
</script>

<MetaData title="Creating object"/>
<PageTitle title="Create object" goBackHref={`/routes/${routeData.ID}`}/>
<Content>
    <LeftContent>
        {#each  data.routeData.elements as element}
            <LeftInputs bind:element {checkForErrors}/>           
        {/each}
    </LeftContent>
    <RightContent>
        {#each  data.routeData.elements as element}
            <RightInputs bind:element {checkForErrors}/>         
        {/each}
        <Button {loading} text="Create object" icon={CloudPlusIcon} on:click={createObject}/>
    </RightContent>
</Content>