<script lang="ts">
    /** Datetime numeric, bind:value to variable as Date */
    export let value:Date
    const date = new Date(value ? value : Date.now());
    // Get the time zone offset in minutes
    const offsetMinutes = date.getTimezoneOffset();
    // Adjust the date and time by the time zone offset
    date.setTime(date.getTime() - offsetMinutes * 60 * 1000);
    // Format the date and time as a string in the required format
    const formattedDate = date.toISOString().slice(0, 16);
    /** Update date and time when datetime input changes */
    function updateDate(e:any){
        value = new Date(e.target.value)
    }
    // If current date as value, if value is empty
    if(!value) value = date
</script>

<input type="datetime-local" value={formattedDate} on:change={updateDate}>

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
    // On mobile
    @media(max-width:700px){
        input{ width: 100%; }
    }
</style>