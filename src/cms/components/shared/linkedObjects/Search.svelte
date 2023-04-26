<script lang="ts">
    export let element:ElementData
    import type { ElementData, RouteObjectData } from "cms/types";
    import type { SearchObjectsFunc } from "cms/funcs";
    import Utils from "cms/utils"
    import SearchIcon from "cms/icons/Search.svelte";
    import ObjectsLinked from "cms/components/shared/linkedObjects/Objects.svelte"
    let value:string = ""
    let objects:RouteObjectData[] = []

    /** Search object */
    async function search(){
        if(value.trim().length>0){
            const apiLoad:SearchObjectsFunc['input'] = { name:"searchObjects",data:{ routeID:element.linkTo!,count:20,filter:{ key:element.linkedSearchableKey!,value} } }
            const apiResponse:SearchObjectsFunc['output'] = await Utils.fetch("/",apiLoad)
            if(apiResponse.ok){
                const newObjectsList:RouteObjectData[] = []
                for(const object of apiResponse.data){
                    const objectExists = element.value.find((data:any)=>data._id===object._id)
                    // if object do not exists
                    if(!objectExists) newObjectsList.push(object)
                }
                objects = [...newObjectsList]
            }   
        }
    }

    /** Reset all stages */
    function resetAll(e:any){
        value = ""
        objects = []
    }
</script>

<div class="searchWrap">
    <input type="text" class="searchInput" placeholder="Search {element.linkTo}..." bind:value on:keyup={search}>
    <div class="searchIcon" data-label="Search" on:click={search} on:keypress={search}>
        <SearchIcon/>
    </div>
</div>
{#if objects.length>0}
    <ObjectsLinked on:addObject={resetAll} on:addObject {objects} {element} isNew={true}/>
{/if}

<style lang="scss">
    .searchWrap{
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 15px;
    }
    .searchInput{
        width: 100%;
        border: none;
        border-radius: 5px;
        background-color: var(--antiBodyBg);
        color: #757575;
        padding: 10px;
        font-size: 17px;
        font-weight: 300;
        box-shadow: var(--boxShadow2);
        &:focus{ outline: none;}
    }
    .searchIcon{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 50%;
        position: absolute;
        right: 5px;
        fill: var(--iconColor);
    }
    // On mobile
    @media(max-width:700px){
        .searchInput{
            font-size: 15px;
        }
    }
</style>