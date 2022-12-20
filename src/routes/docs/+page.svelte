<script>
    import SvelteHead from "@anthony809/svelte-head";
    import PageTitle from "$comps/PageTitle.svelte";
    import Terminal from "$comps/Terminal.svelte";
    const pageData = {
        appName:"svelteCMS",
        favicon:"/favicon.png",
        title:"Documentation",
        description:"svelteCMS's documentation page.",
        backdrop:"/backdrop.png"
    }
</script>

<SvelteHead {...pageData}/>
<PageTitle title="Add to your project"/>
<Terminal>
    npx add-sveltecms
    # Optional: Database url
    npx add-sveltecms --dbUrl=mongodb://localhost:27017
    # Optional: App name( project name )
    npx add-sveltecms --appName=yourAppName
</Terminal>