<script lang="ts">
    export let data:PageData
    import type { PageData } from "./$types"
    import type { UpdateObjectFunc } from "cms/funcs"
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
    import CloudPlusIcon from "cms/icons/Cloud.svelte"
    let routeData = data.routeData
    let loading:boolean = false
    let checkForErrors:boolean = true
    let objectData = data.objectData

    // Add data to route elements
    for(const element of routeData.elements){
        element.value = objectData[element.ID]
    }

    /** Update route object */
    async function updateObject() {
        checkForErrors = true
        loading = true
        // Validate elements
        const errors = Utils.validateElements(routeData.elements)
        // Add route object
        if(errors.length===0){
            const apiLoad:UpdateObjectFunc['input'] = { name:"updateObject",data:{ elements:routeData.elements,routeID:routeData.ID,objectID:objectData._id } }
            const apiResponse:UpdateObjectFunc['output'] = await Utils.fetch("/",apiLoad)
            // if route object was updated
            if(apiResponse.ok){
                await Utils.sleep(200)
                addToast({ type:"ok",msg:apiResponse.msg })
            }
            // else if user was not updated
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

<!-- {JSON.stringify(data.routeData.elements,null,4)} -->
<MetaData title="Editing object"/>
<PageTitle title="Editing object" goBackHref={`/routes/${routeData.ID}`}/>
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
        <Button {loading} text="Update object" icon={CloudPlusIcon} on:click={updateObject}/>
    </RightContent>
</Content>