<script lang="ts">
    export let data: PageData;
    import type { PageData } from './$types';
    import type { RouteObjectData } from 'cms/types';
    import type { DeleteObjectFunc } from 'cms/funcs';
    import Utils from "cms/utils"
    import PageTitle from 'cms/components/shared/PageTitle.svelte';
    import Objects from "cms/components/shared/objects/Objects.svelte"
    import NoResult from "cms/components/shared/NoResult.svelte"
    import Pagination from "cms/components/shared/Pagination.svelte";
    import { addToast } from 'cms/packages/toasts';
    $: objects = data.objects
    $: routeID = data.routeData.ID
    let deleting:boolean = false

    /** Handle delete route object */
    async function deleteObject(e:any){
        // set deleting stage
        deleting = true
        // send delete request
        const object:RouteObjectData = e.detail
        const apiLoad:DeleteObjectFunc['input'] = { name:"deleteObject",data:{ routeID,object } }
        const apiResponse:DeleteObjectFunc['output'] = await Utils.fetch("/",apiLoad)
        // Show api response message
        // If route object was deleted
        if(apiResponse.ok){
            await Utils.sleep(500)
            addToast({ type:"ok",msg:apiResponse.msg })
            // remove deleted object from objects list
            const newObjectsList = objects.filter(data=>data._id!==object._id)
            objects = [...newObjectsList]
        }
        // If route object was not deleted
        else addToast({ type:"error",msg:apiResponse.msg })
        // remove deleting stage
        await Utils.sleep(500)
        deleting = false
    }
</script>

<PageTitle title={`${data.routeData.ID} objects`} goBackHref="/routes" link={{ href:`/routes/${routeID}/new-object`,text:"Add object" }}/>
<Objects bind:deleting {objects} on:delete={deleteObject}/>
{#if objects.length===0}
    <NoResult title="No objects founded" subTitle="Please create new object to be displayed here" hrefText="Create object" href={`/routes/${routeID}/new-object`}/>
{/if}
<Pagination baseDir={`routes/${routeID}`} itemsCount={data.count} page={data.page} itemsPerPage={data.itemsPerPage}/>