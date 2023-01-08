<script>
    export let data;
    import { onMount } from "svelte";
    import Board from "../../../components/board/Board.svelte";
    let attendee_data = {pName:"",avatar:1};
    let creatingBoard = 0;
    
    

    const clickHandler = () =>{
        creatingBoard = 1;
    }
</script>

{#if creatingBoard==0}

    <div class="main-container">
        <img src={"/images/avatar.jpg"} alt="avatar" class="avatar"/>

        <div class="container">

            <!-- svelte-ignore a11y-autofocus -->
            <input  bind:value={attendee_data.pName} autofocus class="container-input" placeholder="Name" />
            <button on:click={clickHandler} class="container-button">Join Board</button>
        </div>
    </div>


{:else if creatingBoard==1}

    <Board name={attendee_data.pName} boardName={""} isAdmin={false} boardId={data.boardid} />

{/if}


<!-- <h1>New world {data.boardid}</h1> -->


<style>
    .main-container{
        width:350px;
        background-color: #ffffff;
        border-radius: 10px;
        margin: 200px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 20px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }

    .avatar{
        margin: 0 auto;
        width:25%;
        border-radius: 50%;
        transform: translateY(-50%);
    }

    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        gap:20px;


    }

    

    .container-input{
        font-size:1.2rem;
        font-weight: bold;
        padding: 10px;
        background-color: #747974;
        border-radius: 5px;
        width:80%;
        color:#f7f7f7;
    }

    .container-input::placeholder{
        color: #f7f7f7;
        opacity: 1;
    }

    .container-button{
        cursor: pointer;
        border: 0;
        width:80%;
        padding: 10px;
        font-size: 1.4rem;
        font-weight: bolder;
        background-color: #09a129;
        border-radius: 20px;
        margin-top: 30px;
        color: #f7f7f7;
    }
    .container-button:active{
        background-color: #747974;
    }


    @media (max-width:320px)  { 
        
        .main-container{
            width:250px;
            height:200px;
        }
     }
</style>