<script lang="ts">
    const API_PATH = "/admin/api/objects"
    export let data:PageData
    clearElementsValue()
    $: routeData = data.routeData
    $: elements = data.routeData.elements
    let _status:StatusData = "public"
    let _categories:CategoryData[] = []
    let _tags:TagData[] = []
    let _createdAt:number = Date.now()
    let _updatedAt:number = Date.now()
    // OTHER VARIABLES
    let checkForErrors:boolean = false
    let loading:boolean = false
    let showFileUploader:boolean = false
    let showSearchCategories:boolean = false
    let showSearchTags:boolean = false
    let lastElementAssetTargeted:ElementData
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    // TYPES
    import type { PageData } from "./$types";
    import type { AssetData,CategoryData,TagData,ApiObjectCreateLoad,ApiObjectCreateData, StatusData, ElementData } from "$Types"
    // SVELTE
    import { goto } from "$app/navigation";
    // UTILITIES
    import { generateSlug,validateObjectElements,fetchPost,wait } from "$Utilities"
    // ICONS
    import AssetIcon from "$Icons/Images.svelte"
    import UpdateAssetIcon from "$Icons/RotateRight.svelte"
    // PACKAGES
    import { newToast } from "@anthony809/svelte-toasts/index"
    import Editor from "@anthony809/svelte-editor/Editor.svelte"
    import FileUploader from "$Packages/fileUploader/FileUploader.svelte";
    // ELEMENTS
    import Button from "$Elements/Button.svelte";
    import Label from "$Elements/Label.svelte";
    import Input from "$Elements/Input.svelte";
    import Textarea from "$Elements/Textarea.svelte"
    import InputNumber from "$Elements/InputNumber.svelte";
    import Status from "$Elements/Status.svelte";
    import Datetime from "$Elements/Datetime.svelte";
    import SearchCategories from "$Elements/searchCategories/Search.svelte"
    import SearchTags from "$Elements/searchTags/Search.svelte"
    // COMPONENTS
    import PageTitleLink from "$Comps/PageTitleLink.svelte";
    // ROUTE COMPONENTS
    import Content from "$Comps/routes/Content.svelte";
    import LeftContent from "$Comps/routes/LeftContent.svelte";
    import RightContent from "$Comps/routes/RightContent.svelte";
    import ImagePreview from "$Comps/routes/ImagePreview.svelte";

    /** CLEAR ELEMENTS VALUE */
    function clearElementsValue(){
        for(const element of data.routeData.elements){
            element.value = ""
        }
    }

    /** AUTO GENERATE SLUG */
    function autoGenerateSlug(elementID:string){
        const textString = elements.find(data=>["textArea","input"].includes(data.type))
        if(textString) elements.forEach(element=>{
            if(element.ID===elementID){
                element.value = generateSlug(textString.value)
                routeData = { ...routeData }
            }
        })
    }

    /** HANDLE ASSET SELECTED */
    function handleFileSelected(e:any){
        const asset:AssetData = e.detail
        routeData.elements.forEach(element=>{
            if(element.ID===lastElementAssetTargeted.ID){
                element.value = asset
                routeData = { ...routeData }
            }
        })
    }

    /** PUBLISH / UPDATE OBJECT */
    async function publish() {
        loading = true
        checkForErrors = true
        const validatorErrors = validateObjectElements(elements)
        const validated = validatorErrors.length === 0
        // Send request
        if(validated){
            // Add status to object
            elements.push({ ID: "_status",name: "Status",type: "_status",value: _status })
            // Add create at to object
            elements.push({ ID: "_createdAt",name: "Created at",type: "_createdAt",value: _createdAt })
            // Add updated at to object
            elements.push({ ID: "_updatedAt",name: "Updated at",type: "_updatedAt",value: _updatedAt })
            // Add categories and tags to elements
            if(routeData.includeTags==="yes"){
                elements.push({ ID: "_tags",name: "Tags",type: "_tags",value: _tags })
            }
            if(routeData.includeCategories==="yes"){
                elements.push({ ID: "_categories",name: "Categories",type: "_categories",value: _categories })
            }
            // Send request
            const apiData:ApiObjectCreateLoad = { elements,routeID:routeData.ID }
            const apiResponse:ApiObjectCreateData = await fetchPost("PUT",API_PATH,apiData)
            // If object was created / updated
            if(apiResponse.ok){
                newToast({ type:"ok",msg:apiResponse.msg })
                await wait(500)
                goto(`/admin/objects/${routeData.ID}`)
            }else newToast({ type:"error",msg:apiResponse.msg })
        }
        // Throw error is data was not validated
        else newToast({ type:"error",msg:validatorErrors[0].msg })
        // Reset stages
        await wait(500)
        loading = false
    }
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Create object",
        description:svelteCMS.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
<FileUploader on:select={handleFileSelected} bind:open={showFileUploader}/>
<PageTitleLink href="/admin/routes" linkText="View routes" goBackSrc={`/admin/objects/${routeData.ID}`} title="New object"/>
<Content>
    <LeftContent>
        {#each routeData.elements as element}
            {#if element.type === "input"}
                <Label text={element.name} error={checkForErrors && !element.value}/>
                <Input bind:value={element.value} placeholder={element.name}/>
            {:else if element.type === "textArea"}
                <Label text={element.name} error={checkForErrors && !element.value}/>
                <Textarea bind:value={element.value} placeholder={element.name}/>
            {:else if element.type === "inputNumber"}
                <Label text={element.name} error={checkForErrors && element.value==="" || element.value===null}/>
                <InputNumber bind:value={element.value} placeholder={element.name}/>
            {:else if element.type === "slug"}
                <Label text={element.name} btnText={element.type==="slug"?"generate":""} on:click={()=>autoGenerateSlug(element.ID)} error={checkForErrors && !element.value}/>
                <Input bind:value={element.value} placeholder={element.name}/>
            {:else if element.type === "content"}
                <Label text={element.name} error={checkForErrors && !element.value}/>
                <Editor bind:data={element.value}/>
            {/if}
        {/each}
    </LeftContent>
    <RightContent>
        <Label text="status" />
        <Status bind:value={_status}/>
        {#if routeData.includeCategories==="yes"}
            <Label text="Categories" btnText={showSearchCategories?"Close":"Add"} on:click={()=>showSearchCategories=!showSearchCategories} />
            <SearchCategories {routeData} bind:categories={_categories} {showSearchCategories} />
        {/if}
        {#if routeData.includeTags==="yes"}
            <Label text="tags" btnText={showSearchTags?"Close":"Add"} on:click={()=>showSearchTags=!showSearchTags} />
            <SearchTags {routeData} bind:tags={_tags} {showSearchTags} />
        {/if}
        {#each routeData.elements as element}
            {#if element.type === "image"}
                <Label text={element.name} error={checkForErrors && !element.value}/>
                {#if element.value && element.value!=="string"}
                    <ImagePreview bind:image={element.value} />
                {/if}
                <Button text={element.value?"Update image":"Upload image"}
                    icon={element.value?UpdateAssetIcon:AssetIcon}
                    on:click={()=>{
                        showFileUploader=true
                        lastElementAssetTargeted = element
                    }}
                />
            {:else if element.type === "dateTime"}
                <Label text={element.name} error={checkForErrors && !element.value}/>
                <Datetime bind:value={element.value}/>
            {/if}
        {/each}
        <Button text="Publish" on:click={publish} bind:loading/>
    </RightContent>
</Content>