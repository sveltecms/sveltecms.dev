<script lang="ts">
    /** Your app name */
    export let appName:string
    /** Your app favicon */
    export let favicon:string
    /** Page title */
    export let title:string
    /** Page description */
    export let description:string
    /** Page image backdrop */
    export let backdrop:string|undefined = undefined
    /** Page Keywords */
    export let keywords:string[]|undefined = undefined
    /** Page type (Default:website) */
    export let ogType:string = 'website'
    /** Page location (Default:en_US) */
    export let ogLocate:string = 'en_US'
    // IMPORTS
    import { page } from '$app/stores';
    /** Current page title */
    $: pageTitle = `${title} | ${appName}`
    /** Current page description */
    $: pageDescription = description
    /** Page backdrop image src */
    $: pageBackdrop = backdrop ? backdrop : "https://i.ibb.co/VB8MqBr/no-image-placeholder.png"
    /** Page backdrop image src */
    $: pageKeywords = keywords ? keywords : [appName]
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <link rel="icon" type="image/png" href={favicon} />
    <meta name="description" content={pageDescription} />
    <meta name="keywords" content={pageKeywords.join(', ')} />
    <meta property="og:site_name" content={appName} />
    <meta property="og:locale" content={ogLocate} />
    <meta property="og:type" content={ogType} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:url" content={$page.url.href} />
    <meta property="og:image" content={pageBackdrop} />
    <meta property="og:image:secure_url" content={pageBackdrop} />
    <meta property="twitter:card" content="summary"/>
    <meta property="twitter:title" content={pageTitle} />
    <meta property="twitter:description" content={pageDescription} />
</svelte:head>