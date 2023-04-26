<script>
    import { cardsData } from "client/data";
    import Cards from "client/components/cards/Cards.svelte";
    import PageTitle from "client/components/PageTitle.svelte";
    import Terminal from "client/components/Terminal.svelte";
    import HomeHero from "client/components/HomeHero.svelte";
    // cms comps and utils
    import MetaData from "cms/components/shared/MetaData.svelte"
</script>

<MetaData />
<HomeHero />
<Cards data={cardsData}/>
<PageTitle title="Add to a svelteKit project"/>
<Terminal>npx sveltejscms@latest</Terminal>