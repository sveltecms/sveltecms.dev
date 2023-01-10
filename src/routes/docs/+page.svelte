<script lang="ts">
    export let data:PageServerData
    import type { PageServerData } from "./$types";
    import SvelteHead from "@anthony809/svelte-head";
    import EditorViewer from "@anthony809/svelte-editor/EditorViewer.svelte"
    const page = data.page
    const pageData = {
        appName:"svelteCMS",
        favicon:"/favicon.png",
        title:"Docs",
        description:"svelteCMS documentation, learn how to install,update and more about the svelte cms.",
        backdrop:"/backdrop.png"
    }
</script>

<SvelteHead {...pageData}/>
<EditorViewer data={page.content}/>