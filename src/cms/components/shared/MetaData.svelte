<script lang="ts">
    import { page } from "$app/stores"
    import faviconSrc from "cms/static/favicon.png"
    import thumbnailSrc from "cms/static/thumbnail.png"
    export let divider:string = "|"
    export let siteName:string = $page.data.appData.site.name
    export let title:string = $page.data.appData.site.title
    export let description:string = $page.data.appData.site.description
    export let favicon:string = faviconSrc
    export let thumbnail:string = thumbnailSrc
    export let url:string = $page.url.href
    export let type:string = "website"
</script>

<svelte:head>
<!-- Primary Meta Tags -->
<link rel="icon" href={favicon} type="image/png"/>
<title>{ title } {divider} { siteName }</title>
<meta name="title" content="{ title } {divider} { siteName }">
<meta name="description" content="{ description }">
<!-- Open Graph / Facebook -->
<meta property="og:type" content="{ type }">
<meta property="og:url" content="{ url }">
<meta property="og:title" content="{ title } {divider} { siteName }">
<meta property="og:description" content="{ description }">
<meta property="og:image" content="{thumbnail}">
<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="{ url }">
<meta property="twitter:title" content="{ title } {divider} { siteName }">
<meta property="twitter:description" content="{ description }">
<meta property="twitter:image" content="{ thumbnail }">
</svelte:head>