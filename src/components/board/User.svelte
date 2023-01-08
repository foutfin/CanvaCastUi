<script>
    export let name;
</script>
<div class="container">
    <img src="/images/avatar.jpg" alt="avatae"/>
    <span>{name}</span>
</div>

<style>
    .container{
        display: flex;
        background-color: transparent;
        margin:0 10px;
        align-items: center;
        gap:10px;
        
    }
    .container span{

        font-size: 1.1rem;
        background-color: transparent;
        
    }
    img{
        width:50px;
        height:50px;
        border-radius: 25px;

    }
</style>