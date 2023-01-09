<script>
    import Board from "../components/board/Board.svelte";
    import Loading from "../components/board/Loading.svelte";
    let board_data = {pName:"",bName:"",avatar:1};
    let creatingBoard = 0;
    let boardId;

    const clickHandle =(e)=>{
        if(board_data.pName.length > 0 & board_data.bName.length > 0){
            creatingBoard = 1;
            const url = `https://canvacastserver-production.up.railway.app/createboard`;
            fetch(url, {
                        method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(board_data),
                    }
            ).then((response) => response.json())
             .then((data) =>{
                    boardId = data.boardid;  
                    creatingBoard = 2;
                    
                });
            return;
        }
        e.target.style.backgroundColor = "#ad2831";
        return;
    }

</script>


{#if creatingBoard==1}

    <Loading message={"Creating a Board"} />


{:else if creatingBoard==2}

    <Board name={board_data.pName} isAdmin={true} boardId={boardId}/>

{:else}

    <div class="main-container">
        <img src={"images/hacker.png"} alt="avatar" class="avatar"/>
        <div class="container">
            <!-- svelte-ignore a11y-autofocus -->
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
        border:1px solid #161b33;
        background-color: #ffffff;
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
        border: 0;
    }
    .container-input:focus{
        outline: 0;
    }

    .container-input::placeholder{
        color: #464646;
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
        transition: background-color 0.5s;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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