<script lang="ts">
    import"client/static/editor.scss"
    export let data:PageData
    import type { PageData } from "./$types";
    // cms comps and utils
    import MetaData from "cms/components/shared/MetaData.svelte"
    import EditorViewer from "cms/packages/editor/EditorViewer.svelte"
    import Warning from "client/components/Warning.svelte";
</script>

<MetaData title="Documentation"/>
<Warning />
<EditorViewer data={data.page.content} themeColor="dark"/>