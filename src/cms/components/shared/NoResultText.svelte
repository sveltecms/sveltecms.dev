<script lang="ts">
    export let title:string
    export let subTitle:string
    export let error:boolean = false
</script>

<div class="noResult" class:error>
    <h2>{title}</h2>
    <h3>{subTitle}</h3>
</div>

<style>
    .noResult{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        border-radius: 5px;
        background-color: var(--antiBodyBg);
        color: var(--textColor);
        box-shadow: var(--boxShadow);
        margin-bottom: 20px;
        text-align: center;
    }
    h2{
        font-size: 40px;
        font-weight: 900;
        text-transform: uppercase;
        margin-bottom: 5px;
        -webkit-text-stroke: 1px var(--textColor);
    }
    h3{
        font-size: 25px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 7px;
    }
    .noResult.error{
        background-color: var(--errorBg);
    }
    @media(max-width:700px){
        h2{
            font-size: 30px;
        }
        h3{
            font-size: 15px;
        }
    }
</style>