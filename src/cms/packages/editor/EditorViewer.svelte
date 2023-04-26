<script lang="ts"> 
    /** Date saved from editorJs just the way it was */
    export let data:EditorJsData
    export let themeColor:"dark"|"light" = "dark"
    import type { EditorJsData } from "./types"
    // theme
    import { theme } from "./theme";
    // COMPONENTS
    import Paragraph from "./components/viewer/Paragraph.svelte";
    import Header from "./components/viewer/Header.svelte";
    import Code from "./components/viewer/Code.svelte";
    import List from "./components/viewer/List.svelte";
    import Image from "./components/viewer/Image.svelte";
</script>

{@html theme(themeColor)}
<div class="cmsEditor">
    {#each data.blocks as block (block.id)}
        {#if block.type === "paragraph" }
            <Paragraph text={block.data.text}/>
        {:else if block.type === "header" }
            <Header {...block.data} />
        {:else if block.type === "code" }
            <Code text={block.data.code} />
        {:else if block.type === "list" }
            <List data={block.data} />
        {:else if block.type === "image" }
            <Image image={block.data} />
        {/if}
    {/each}
</div>

<style>
    .cmsEditor{
        display: flex;
        flex-direction: column;
        border-radius: 5px;
    }
</style>