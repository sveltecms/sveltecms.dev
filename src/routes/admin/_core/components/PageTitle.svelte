<script lang="ts">
    export let title:string
</script>

<div class="title">
    <h2>{title}</h2>
</div>

<style>
    .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--textColor);
        margin-bottom: 10px;
    }
    h2{
        font-weight: 500;
        font-size: 35px;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    @media(max-width:700px){
        h2{
            font-size: 30px;
        }
    }
</style>