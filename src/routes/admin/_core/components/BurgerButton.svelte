<script lang="ts">
    export let open:boolean = false
    /** Close or close burger */
    function handleClick(){ open=!open }
</script>

<div class="burger" class:open on:click={handleClick} on:keypress={handleClick}>
    <div></div>
</div>

<style lang="scss">
    $burgerSize: 35px;
    $burgerColor: #ccc;
    $space: 14px;
    // scss here
    .burger{
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        width: calc($burgerSize + 5px);
        height: $burgerSize;
        div{
            width: 100%;
            height: 3px;
            border-radius: 0.5px;
            background-color: $burgerColor;
            position: relative;
            &::after,&::before{
                content: '';
                position: absolute;
                width: 100%;
                height: 3px;
                border-radius: 0.5px;
                background-color: $burgerColor;
                transition: transform 0.2s ease-in-out;
            }
            &::after{ transform: translateY($space); }
            &::before{ transform: translateY(-$space); }
        }
    }
    // when burger button is open
    .burger.open{
        div{
            background-color: transparent;
            &::after{
                transform: rotate(135deg);
                border-radius: 10px;
            }
            &::before{
                transform: rotate(-135deg);
                border-radius: 10px;
            }
        }
    }
    @media screen and (max-width:700px){
        .burger{ display: flex; }
    }
</style>