<script>
    export let message;
</script>

<div class="loading-main">
    <div >
        <img src="/images/loading.gif" alt="loading"/>
        <span>{message}</span>
    </div>
</div>



<style>
    .loading-main{
        min-height:100vh;
        background-color: #e5e5e5;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading-main div{
        display: flex;
        align-items: center;
    }
    .loading-main img{
        width:100px;
        height: auto;
    }
    .loading-main span{
        margin-left: 20px;
        font-weight: bold;
        color:#7f7f7f;
        text-align: center;
        font-size: 1.2rem;
    }
</style>