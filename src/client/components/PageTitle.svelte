<script lang="ts">
    export let title:string
</script>

<h2 class="title">{title}</h2>

<style>
    .title{
        font-size: 35px;
        font-weight: 800;
        color: var(--headerColor);
        margin-bottom: 20px;
        text-transform: uppercase;
        margin-left: 20px;
        position: relative;
    }
    .title::after{
        content: "";
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
        background-color: var(--mainColor);
        height: calc(100% - 10px);
        width: 6px;
        border-radius: 10px;
        opacity: 50%;
    }
    @media(max-width:700px){
        .title{
            font-size: 25px;
        }
    }
</style>