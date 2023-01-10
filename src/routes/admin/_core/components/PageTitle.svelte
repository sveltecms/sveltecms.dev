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
        font-size: 20px;
        text-shadow: 2px 2px 0px #5b5b5b;
        margin-bottom: 10px;
    }
    h2{ font-weight: 600; }
</style>