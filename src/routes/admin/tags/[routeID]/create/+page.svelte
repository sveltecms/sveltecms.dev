<script lang="ts">
    export let data:PageData
    const API_PATH = "/admin/api/tags"
    const routeID = data.routeData.ID
    const tag:TagLoad = { name: "",slug: "",description: "" }
    $: errorOnFields = {
        name: (checkForErrors && tag.name.trim()===""),
        description: (checkForErrors && tag.description.trim()===""),
        slug: (checkForErrors && tag.slug.trim()==="")
    }
    let checkForErrors:boolean = false
    let loading:boolean = false
    // Svelte
    import { goto } from "$app/navigation";
    // Types
    import type { TagLoad, ApiTagCreateLoad, ApiTagCreateData } from "$Types"
    import type { PageData } from "./$types"
    import { validateTagCategory, wait, generateSlug, fetchPost } from "$Utilities"
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    // Packages
    import { newToast } from "@anthony809/svelte-toasts/index";
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

    /** Publish or update tag */
    async function publish() {
        checkForErrors = true // set check for error
        loading = true // set spinner
        const validatorErrors = validateTagCategory(tag)
        const validated = validatorErrors.length === 0
        // If validator passed
        if(validated){
            // Send request
            const apiData:ApiTagCreateLoad = {...tag,routeID}
            const apiResponse:ApiTagCreateData = await fetchPost("PUT",API_PATH,apiData)
            if(apiResponse.ok){
                newToast({ type:"ok",msg:apiResponse.msg })
                await wait(1000)
                goto(`/admin/tags/${routeID}`)
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
        title:"Create tag",
        description:svelteCMS.site.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
<Content>
    <LeftContent>
        <Label text="Name" error={errorOnFields.name}/>
        <Input placeholder="Tag name" bind:value={tag.name}/>
        <!-- Only show when adding new tag -->
        {#if !tag._id}
            <Label text="Slug" btnText="Generate" on:click={()=>tag.slug=generateSlug(tag.name)} error={errorOnFields.slug}/>
            <Input placeholder="Tag slug" bind:value={tag.slug}/>
        {/if}
        <Label text="Tag description" error={errorOnFields.description}/>
        <TextArea placeholder="Tag description" bind:value={tag.description}/>
    </LeftContent>
    <RightContent>
        <Button text="Publish" {loading} on:click={publish} icon={PublishIcon}/>
    </RightContent>
</Content>