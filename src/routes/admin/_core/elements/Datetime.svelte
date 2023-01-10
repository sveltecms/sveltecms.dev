<script lang="ts">
    /** Datetime numeric, bind:value to variable number */
    export let value:number
    const date = new Date(value)
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()
    const hour = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours()
    const minute = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
    const defaultValue = `${date.getFullYear()}-${date.getMonth()+1}-${day}T${hour}:${minute}`
    /** Update date and time when datetime input changes */
    function updateDate(e:any){
        value = new Date(e.target.value).getTime()
    }
</script>

<input type="datetime-local" value={defaultValue} on:change={updateDate}>

<style lang="scss">
    input{
        border: none;
        padding: 10px;
        border-radius: 5px;
        background-color: var(--antiBodyBg);
        color: white;
        margin-bottom: 15px;
        font-size: 15px;
        &:focus{ outline: none; }
        &::-webkit-calendar-picker-indicator{
            cursor: pointer;
            border-radius: 50%;
            padding: 5px;
            background-color: rgb(242, 242, 242);
        }
    }
</style>