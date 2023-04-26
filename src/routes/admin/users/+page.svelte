<script lang="ts">
    export let data:PageData
    import type { PageData } from "./$types"
    import type { UserData } from "cms/types"
    import type { DeleteUserFunc } from "cms/funcs"
    import { addToast } from "cms/packages/toasts"
    import Utils from "cms/utils"
    import MetaData from "cms/components/shared/MetaData.svelte";
    import Users from "cms/components/shared/users/users.svelte"
    import PageTitle from "cms/components/shared/PageTitle.svelte"
    import NoResult from "cms/components/shared/NoResult.svelte"
    import Pagination from "cms/components/shared/Pagination.svelte";
    $: users = data.users

    /** Delete user */
    async function deleteUser(e:any) {
        const userData:UserData = e.detail
        const apiLoad:DeleteUserFunc['input'] = { name:"deleteUser",data:userData }
        const apiResponse:DeleteUserFunc['output'] = await Utils.fetch("/",apiLoad)
        // if user was created
        if(apiResponse.ok){
            addToast({ type:"ok",msg:apiResponse.msg })
            await Utils.sleep(1000)
            // remove user from current lis
            const newUsersList = users.filter(data=>data._id!==userData._id)
            users = [...newUsersList]
        }
        // else if user was not created
        else{ addToast({ type:"error",msg:apiResponse.msg }) }
    }
</script>

<MetaData title="Users"/>
<PageTitle title="Users" link={{ href:"/users/create",text:"Create user" }}/>
<Users {users} on:delete={deleteUser}/>
{#if users.length===0}
    <NoResult title="No users founded" subTitle="Please create new user to be displayed here" hrefText="Create user" href="/users/create"/>
{/if}
<Pagination baseDir="users" itemsCount={data.count} page={data.page} itemsPerPage={data.itemsPerPage}/>