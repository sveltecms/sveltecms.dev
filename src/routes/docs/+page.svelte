<script lang="ts">
    export let data:PageServerData
    import type { PageServerData } from "./$types";
    import SvelteHead from "@anthony809/svelte-head";
    import EditorViewer from "@anthony809/svelte-editor/EditorViewer.svelte"
    import editorConfig from "@anthony809/svelte-editor/config";
    const defaultEditorConfig = { ...$editorConfig }
    const page = data.page
    const pageData = {
        appName:"svelteCMS",
        favicon:"/favicon.png",
        title:"Docs",
        description:"svelteCMS documentation, learn how to install,update and more about the svelte cms.",
        backdrop:"/backdrop.png"
    }
    let currentWidth:number = 0
    $: if(currentWidth<=700){
        $editorConfig['h2Size'] = "25px"
        $editorConfig.h2Weight = "400"
    }else {
        $editorConfig['h2Size'] = defaultEditorConfig.h2Size
        $editorConfig.h2Weight = defaultEditorConfig.h2Weight
    }
</script>
<svelte:window bind:outerWidth={currentWidth}/>
<SvelteHead {...pageData}/>
<EditorViewer data={page.content}/>