<script lang="ts">
    
</script>

<div class="warning">
    <p>
        Before adding or running svelteCMS, make sure you have a 
        <a href="https://mongodb.com/" target="_blank" rel="noopener noreferrer">MongoDB</a> connection url and
        <a href="https://cloudinary.com/" target="_blank" rel="noopener noreferrer">Cloudinary</a> account.
    </p>
</div>

<style lang="scss">
    .warning{
        padding: 10px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 300;
        border: 2px solid #ffffff;
        color: #d8d8d8;
        background: #ec6969;
        margin: 10px 0;
        a{
            text-decoration: none;
            font-weight: 600;
            color: #383e41;
        }
    }
    // Mobile
    @media(max-width:700px){
        .warning{
            font-size: 13px;
        }
    }
</style>