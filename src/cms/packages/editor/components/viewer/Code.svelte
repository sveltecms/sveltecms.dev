<script lang="ts">
    export let text:string
    import hljs from "highlight.js/lib/common"
    /** Copy code to clipboard*/
    async function copyToClipboard() {
        btnText = "copied"
        await navigator.clipboard.writeText(cleanText)
        // Set button text back to copy after 2 seconds
        setTimeout(()=>btnText="Copy",2000)
    }
    let btnText = "copy"
    let cleanText = text.replace(/```\S+/g, '').trimStart()
    let lang = text.includes("```") ? text.trim().split("```")[1].split(" ")[0].trim() : ""
    let htmlCode = hljs.highlight(cleanText,{ language:lang||"html" }).value
</script>

<pre>
    <code class="language-{lang}">{@html htmlCode}</code>
    <span class="copy" on:click={copyToClipboard} on:keypress={copyToClipboard}>{btnText}</span>
</pre>

<style>
    .copy{
        background-color: #333638;
        color: white;
        cursor: pointer; 
        position: absolute;
        top: 0;
        right: 0;
        text-decoration: none;
        padding: 3px 5px;
        border-radius: 1px;
        font-size: 10px;
        font-weight: 300;
        margin-bottom: 5px;
        text-transform: uppercase;
    }
</style>