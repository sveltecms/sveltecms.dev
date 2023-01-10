<script lang="ts">
    export let data:PageData
    const API_PATH = "/admin/api/categories"
    const routeID = data.routeData.ID
    const category:CategoryLoad = data.category
    $: errorOnFields = {
        name: (checkForErrors && category.name.trim()===""),
        description: (checkForErrors && category.description.trim()===""),
        slug: (checkForErrors && category.slug.trim()==="")
    }
    let checkForErrors:boolean = false
    let showFileUploader:boolean = false
    let loading:boolean = false
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    // Svelte
    import { goto } from "$app/navigation";
    // Types
    import type { CategoryLoad, ApiCategoryUpdateLoad, ApiCategoryUpdateData } from "$Types"
    import type { PageData } from "./$types"
    import { validateTagCategory, wait, generateSlug, fetchPost } from "$Utilities"
    // Packages
    import { newToast } from "@anthony809/svelte-toasts/index";
    import FileUploader from "$Packages/fileUploader/FileUploader.svelte";
    import type { AssetData } from "$Types";
    // Icons
    import PublishIcon from "$Icons/Globe.svelte"
    // Components
    import Button from "$Comps/Button.svelte";
    import ImagePreview from "$Comps/routes/ImagePreview.svelte";
    import Content from "$Comps/routes/Content.svelte";
    import LeftContent from "$Comps/routes/LeftContent.svelte";
    import RightContent from "$Comps/routes/RightContent.svelte";
    // Elements
    import Label from "$Elements/Label.svelte"
    import Input from "$Elements/Input.svelte"
    import TextArea from "$Elements/Textarea.svelte"

    /** Update category image update */
    function updateImage(e:any){
        const newImage:AssetData = e.detail
        category.image = newImage
    }

    /** Publish or update category */
    async function publish() {
        checkForErrors = true // set check for error
        loading = true // set spinner
        const validatorErrors = validateTagCategory(category)
        const validated = validatorErrors.length === 0
        // If validator passed
        if(validated){
            // Send request
            const apiData:ApiCategoryUpdateLoad = {...category,routeID}
            const apiResponse:ApiCategoryUpdateData = await fetchPost("POST",API_PATH,apiData)
            if(apiResponse.ok){
                newToast({ type:"ok",msg:apiResponse.msg })
                await wait(1000)
                goto(`/admin/categories/${routeID}`)
            }
            else newToast({ type:"error",msg:apiResponse.msg })
        }
        // If validator did not passed
        else newToast({ type:"error",msg:validatorErrors[0].msg })
        await wait(1000) // wait 1 second
        loading = false // remove spinner
    }
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Editing category",
        description:svelteCMS.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
<FileUploader bind:open={showFileUploader} on:select={updateImage}/>
<Content>
    <LeftContent>
        <Label text="Name" error={errorOnFields.name}/>
        <Input placeholder="Category name" bind:value={category.name}/>
        <!-- Only show when adding new category -->
        {#if !category._id}
            <Label text="Slug" btnText="Generate" on:click={()=>category.slug=generateSlug(category.name)} error={errorOnFields.slug}/>
            <Input placeholder="Category slug" bind:value={category.slug}/>
        {/if}
        <Label text="Category description" error={errorOnFields.description}/>
        <TextArea placeholder="Category description" bind:value={category.description}/>
    </LeftContent>
    <RightContent>
        <ImagePreview image={category.image}/>
        <Button text="Update image" on:click={()=>showFileUploader=true}/>
        <Button text="Publish" {loading} on:click={publish} icon={PublishIcon}/>
    </RightContent>
</Content>