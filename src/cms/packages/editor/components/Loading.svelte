<div class="wrapper">
    <div class="spinner"></div>
</div>

<style>
    .wrapper{
        background-color: rgba(0,0,0,10%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
    }
    .spinner{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: #edededc8 3px dashed;
        border-top: transparent 5px solid;
        animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
        from{ transform: rotate(0deg);}
        to{ transform: rotate(360deg);}  
    }
</style>