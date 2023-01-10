<script lang="ts">
    import svelteCMS from "$svelteCMS";
    import SvelteHead from "@anthony809/svelte-head"
    import PageTitleLink from "$Comps/PageTitleButton.svelte";
    import ToggleSwitch from "$Comps/ToggleSwitch.svelte";
    import Setting from "$Comps/settings/Setting.svelte";
    import { page } from "$app/stores";
    import type { UserData } from "$Types";
    let user:UserData = $page.data.user
    const pageData = {
        appName:svelteCMS.site.name,
        favicon:svelteCMS.site.favicon,
        title:"Settings",
        description:svelteCMS.site.desc,
        backdrop:svelteCMS.site.backdrop
    }
</script>

<SvelteHead {...pageData}/>
<PageTitleLink title={user.firstName} btnText="Logout" on:click={()=>location.href = "/admin/auth/logout"}/>
<Setting text="Soon to be added">
    <ToggleSwitch checked={false} />
</Setting>