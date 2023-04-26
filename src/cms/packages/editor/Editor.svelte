<script lang="ts">
    export let color:string = "white"
    export let bg:string = "rgba(0,0,0,.1)"
    export let data:any|undefined = undefined
    import { onMount, onDestroy } from "svelte";
    import Loading from "./components/Loading.svelte";

    // Wait function
    const wait = async(time=200)=> new Promise(r=>setTimeout(r,time))

    /** Sync editor data with bind value */
    async function syncValue(){
        if(ready){
            const editorData = await EditorJs.save()
            data = editorData
            console.clear() // Remove message from editor js
        }
    }

    // Remove scripts from head, when component is destroyed
    function whenDestroy(){
        for(const apiElement of apiElementList){
            apiElement.remove()
        }
    }

    // Add scripts to head
    function addScriptsToHead(){
        for(const scriptName of SCRIPTS){
            const apiElement = document.createElement("script")
            apiElement.setAttribute("src",`https://cdn.jsdelivr.net/npm/${scriptName}`)
            // Add script to head and api elements list
            document.head.append(apiElement)
            apiElementList.push(apiElement)
        }
    }

    // When component mount
    async function whenMount() {
        addScriptsToHead()
        await wait() // Wait so it give time to add scripts to header
        const tools = {
            // @ts-ignore
            header: { class: Header },
            // @ts-ignore
            list: { class: List },
            // @ts-ignore
            code: CodeTool,
            // @ts-ignore
            style: EditorJSStyle.StyleInlineTool,
            // @ts-ignore
            image: SimpleImage,
            inlineCode: {
                // @ts-ignore
                class: InlineCode,
                shortcut: 'CMD+SHIFT+M',
            }
        }
        const editorConfig = {
            holder:"editor",
            placeholder:"Content...",
            minHeight:"auto",
            data: data,
            tools:tools,
            onReady:()=>{ ready = true },
        }
        // @ts-ignore
        EditorJs = new EditorJS(editorConfig)
    }

    // Install api scripts when components mounts
    onMount(whenMount)

    // Remove api scripts when component is destroyed
    onDestroy(whenDestroy)
    
    // VARIABLES
    let EditorJs:any
    let ready:boolean = false
    let apiElementList:HTMLScriptElement[] = []
    const SCRIPTS = [ '@editorjs/editorjs@latest', '@editorjs/header@latest', '@editorjs/list@latest','@editorjs/code','@editorjs/simple-image@latest',"@editorjs/inline-code","editorjs-style@latest?npm" ]
    $: style = `--color:${color};--bg:${bg};`
</script>

{#if !ready }
    <Loading/>
{/if}
<div id="editor" on:mouseleave={syncValue} class:ready {style}></div>

<style>
    #editor{
        color: var(--color);
        background-color: var(--bg);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* padding: 10px 25px 10px 15px; */
        padding: 10px;
        margin-bottom: 10px;
        /* USE TO WAIT FOR EDITOR TO BE READY */
        max-height: 0px;
        opacity: 0%;
    }
    /* WHEN READY */
    #editor.ready{
        max-height: fit-content;
        opacity: 100%;
    }
    :global(.ce-block__content,.ce-toolbar__content) {
        max-width: 100%;
    }
    :global(.ce-popover--opened,.ce-inline-toolbar--showed) {
        color: #5d5d5d;
    }
    :global(.ce-header) {
        padding: 0px !important;
    }
    @media(min-width:1000px){
        :global(.ce-toolbar__actions--opened){
            transform: translate(60px, 30px);
            border-radius: 5px;
            background-color: aliceblue;
            padding: 2px 5px;
        }
    }
</style>