<script lang="ts">
    export let lang:string = "css"
    export let code:string
    import { onDestroy, onMount } from "svelte";
    // Add scripts elements to head
    onMount(()=>{
        for(const script of scripts){
            const element = document.createElement(script.type)
            if(script.type==="script"){
                element.setAttribute("src",script.src)
            }else{
                element.setAttribute("href",script.src)
                element.setAttribute("rel","stylesheet")
            }
            document.head.append(element)
            scriptsElements.push(element)
        }
    })
    // Remove elements from head
    onDestroy(()=>{
        for(const element of scriptsElements){
            element.remove()
        }
    })
    // Variables
    const scripts = [
        { type:"script",src:"/prism/prism.js" },
        { type:"link",src:"/prism/prism.css" }
    ]
    const scriptsElements:HTMLElement[] = []
</script>

<pre><code class="language-{lang}">
    {@html code}
</code></pre>

<style>
    pre{  animation: fade-in 0.5s; }
    @keyframes fade-in{
        from {
            display: hidden;
            opacity: 0%;
        }
        to {
            display: contents;
            opacity: 100%;
        }
    }
</style>