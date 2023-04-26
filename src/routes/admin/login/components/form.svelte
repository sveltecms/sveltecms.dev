<form class="form" method="POST">
    <slot />
</form>

<style lang="scss">
    .form{
        max-width: 350px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--antiBodyBg);
        padding: 20px;
        border-radius: 5px;
    }
</style>