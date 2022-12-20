<script>
    import { cardsData } from "$src/data";
    import SvelteHead from "@anthony809/svelte-head"
    import Cards from "$comps/cards/Cards.svelte";
    import PageTitle from "$comps/PageTitle.svelte";
    import Terminal from "$comps/Terminal.svelte";
    import HomeHero from "$comps/HomeHero.svelte";
    const pageData = {
        appName:"svelteCMS",
        favicon:"/favicon.png",
        title:"Home",
        description:"Svelte head is a component to easily add and update svelte route pages's meta information.",
        backdrop:"/backdrop.png"
    }
</script>

<SvelteHead {...pageData}/>
<HomeHero />
<Cards data={cardsData}/>
<PageTitle title="Add to your project"/>
<Terminal>
    npx sveltejscms@latest
    # Optional: MongoDB database url
    npx sveltejscms@latest --dbUrl=mongodb://localhost:27017
    # Optional: App name( project name )
    npx sveltejscms@latest --appName=yourAppName
</Terminal>