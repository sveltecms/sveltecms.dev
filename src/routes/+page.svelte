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
<PageTitle title="Add to a svelteKit project"/>
<Terminal>npx sveltejscms@latest</Terminal>