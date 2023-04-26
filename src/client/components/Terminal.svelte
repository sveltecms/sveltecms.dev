<script lang="ts">
    import macFolderIconSrc from "client/static/folder.ico"
    import { onMount } from "svelte";
    let data:HTMLDivElement
    onMount(()=>{
        let newData = ""
        for(let innerData of data.innerHTML.split('\n')){
            if(innerData.includes("npx") && !innerData.startsWith("#")){
                innerData = innerData.replace(/npx/ig,`<span class="superKey">npx</span>`)
            }else if(!innerData.startsWith("#")){
                innerData = `<span class="comment">${innerData}</span>`
            }
            newData+=`<span class="line">${innerData.trim()}</span>\n`
        }
        data.innerHTML = newData
    })
</script>

<div class="terminal" id="install">
    <div class="header">
        <div class="actions">
            <div class="close"></div>
            <div class="minimize"></div>
            <div class="fullscreen"></div>
        </div>
        <span class="title">
            <img src={macFolderIconSrc} alt="MacBook icon">
            Terminal
        </span>
    </div>
    <div class="data" bind:this={data}>
        <slot/>
    </div>
</div>

<style lang="scss">
    .terminal{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 2px;
        background-color: rgba(0,0,0,.7);
        margin-bottom: 20px;
    }
    .actions{
        display: flex;
        align-items: center;
    }
    .close{ background-color: #FF794D; }
    .minimize{ background-color: #FFDD58; }
    .fullscreen{ background-color: #48C774; }
    .close,.minimize,.fullscreen{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #F7FAFD;
        padding: 5px 10px;
    }
    .title{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 200;
        color: black;
        img{
            pointer-events: none;
            width: 20px;
            height: 20px;
            object-fit: contain;
            margin-right: 5px;
        }
    }
    .data{
        display: flex;
        flex-direction: column;
        padding: 10px;
        animation: fade-in 1s ease;
    }
    :global(.line),:global(.superKey),:global(.comment){
        font-size: 16px;
        font-weight: 300;
        color: white;
        margin-bottom: 10px;
        &::selection{ background-color: blue; }
    }
    :global(.superKey){ font-weight: 300; color: #5683a5;}
    :global(.comment){ color: #1f571f;}
    @keyframes fade-in{
        from { opacity: 0%; }
        to { opacity: 100%; }
    }
</style>