<script>
    import Board from "../components/board/Board.svelte";
    let board_data = {pName:"",bName:"",avatar:1};
    let creatingBoard = 0;
    let boardId;


    const clickHandle =()=>{
        creatingBoard = 1;
        const url = "https://canvacastserver-production.up.railway.app/createboard"
        fetch(url, {
                        method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(board_data),
                    }
            )
          .then((response) => response.json())
          .then((data) =>{
                  console.log(data);
                //   window.location.href = "http://" + location.host +`/board/${data.roomid}`;
                boardId = data.boardid;  
                creatingBoard = 2;
                  
            });
    }

</script>


{#if creatingBoard==1}

    <h1>Wait a while Creating Board for you</h1>


{:else if creatingBoard==2}

    <Board name={board_data.pName} boardName={board_data.bName} isAdmin={true} boardId={boardId}/>

{:else}

    <div class="main-container">

        <img src={"images/avatar.jpg"} alt="avatar" class="avatar"/>

        <div class="container">

            <input  bind:value={board_data.pName} autofocus class="container-input" placeholder="Name" />
            <input  bind:value={board_data.bName}   class="container-input" placeholder="Board Name"/>

            <button on:click={clickHandle} class="container-button">Create Board</button>

        </div>

    </div>

{/if}





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