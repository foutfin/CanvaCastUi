<script>

    export let name,isAdmin,boardId;

    import {context,drawing,path,pen} from './stores/store.js';
    import {drawBoard,eraseBoard,lineBoard} from './utils/socketdraw.js';
    import { onMount } from "svelte";
    import Canvas from "./Canvas.svelte";
    import User from "./User.svelte";
    import Newicon from "./Newicon.svelte";
    import Loading from "./Loading.svelte";

    let names = {};
    let me ={};
    let connected = false;
    let loading = true;
    const socketurl = `ws://127.0.0.1:5000/join/${boardId}`;
    const url = `http://127.0.0.1:5173/board/${boardId}`;

    onMount(()=>{
        
        const createBoard =()=>{
            const c = document.createElement('canvas');
            c.setAttribute("width","1920");
            c.setAttribute("height","1080");
            return c;
        }

        const socket = new WebSocket(socketurl);
        socket.addEventListener("open",()=>{ 
            let addmes = JSON.stringify({
                a:"add",
                n: isAdmin ? "" : name,
                r: isAdmin ? "admin" : "user",
            });         
            socket.send(addmes);
            drawing.subscribe((value)=>{
                if (value != undefined){
                    if (!value){
                    const mes = {a:"p",
                                 d : $path,
                                 p : {
                                    t:$pen.type,
                                    s:$pen.stroke,
                                    c:$pen.color,
                                 },
                                 i : me.id,
                            }
                    socket.send(JSON.stringify(mes));
                    path.update(()=>{
                        return {"d":{x:0,y:0},"m":[]};
                    })
                }
                }
            });
        });
        socket.addEventListener("message",(ev)=>{
            let data = JSON.parse(ev.data);
            if(data.a === "added"){
                if(data.r === "you"){
                    me.name = data.n;
                    me.id = data.id;
                    me = me;
                }else{
                    const board = createBoard();
                    names[data.id] ={name : data.n,id:data.id,canvas: board,ctx: board.getContext('2d')} ;
                }
                socket.send(JSON.stringify({ a : "list" , id: me.id}));               
                loading = false;
                connected = true;
            }else if(data.a === "eadded"){
                connected = false;
            }else if(data.a === "list"){
                console.log(data.l);
                 data.l.forEach((value)=>{
                    if(!names[value.id]){
                        const board = createBoard();
                        names[value.id] = {
                            name: value.name,
                            id: value.id,
                            canvas: board,
                            ctx: board.getContext('2d'),
                        };
                    }
                 })
            }else if(data.a === "p"){
                if(data.p.t == 2 | data.p.t == 3 ){
                    drawBoard(data.d,names[data.i].canvas,names[data.i].ctx,data.p.s,data.p.c,$context);
                }else if(data.p.t == 4){
                    eraseBoard(data.d,names[data.i].canvas,names[data.i].ctx,$context);
                }else if(data.p.t == 5){
                    lineBoard(data.d,names[data.i].canvas,names[data.i].ctx,data.p.s,data.p.c,$context);
                }
            }else if(data.a === "leaved"){
                delete names[data.id];
                names = names;
            }
        });
        socket.addEventListener("close",()=>{
            // loading = false;
            connected = false;
        });
        socket.addEventListener("error",()=>{
            connected = false;
            // loading = false;
        });
    })

    //Handlers
    const showOverlay = ()=>{
        console.log("show overlay clicked");
        const overlay = document.getElementsByClassName("overlay")[0]
        overlay.style.display = "block";
    }
    const hideOverlay = ()=>{
        const overlay = document.getElementsByClassName("overlay")[0]
        overlay.style.display = "none";
    }
</script>

{#if loading}

    <Loading message={"Joining to Board"} />    

{:else }

    {#if connected}

        <div class="main">  
            <div class="board-contai">
                <Canvas/>
            </div>
            <div class="toolbar">
                <Newicon id="1" >
                    <svg fill="none" height="30" viewBox="0 0 20 20" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M6.63564 2.28753C5.98325 1.75037 5 2.21445 5 3.05952V17.0583C5 17.9844 6.15025 18.413 6.75622 17.7127L10.2799 13.6402C10.5648 13.3109 10.9788 13.1217 11.4142 13.1217L17.0061 13.1217C17.9444 13.1217 18.3661 11.9461 17.6418 11.3497L6.63564 2.28753Z" fill="#212121"/></svg>
                </Newicon>

                <Newicon id="2" >
                    <svg height="30" viewBox="0 0 512 512" width="30" xmlns="http://www.w3.org/2000/svg"><title/><polygon points="103 464 48 464 48 409 358.14 98.09 413.91 153.87 103 464"/><path d="M425.72,142,370,86.28l31.66-30.66C406.55,50.7,414.05,48,421,48a25.91,25.91,0,0,1,18.42,7.62l17,17A25.87,25.87,0,0,1,464,91c0,7-2.71,14.45-7.62,19.36ZM418.2,71.17h0Z"/></svg>
                </Newicon>

                <Newicon id="3" >
                    <svg viewBox="0 0 512 512" width="30" height="30" xmlns="http://www.w3.org/2000/svg"><g id="Highlighter_pen"><path d="M451.4692,125.4041,380.5656,54.5016a13.1093,13.1093,0,0,0-17.7457-.7327L164.9985,221.3722,284.6018,340.9744l167.6-197.8225A13.11,13.11,0,0,0,451.4692,125.4041Z"/><rect height="172.7608" transform="translate(-166.0416 227.6148) rotate(-45)" width="41.0143" x="171.2274" y="227.8569"/><path d="M94.5521,363.7306,142.2413,411.42c18.5232-11.008,40.65-15.58,63.1619-17.3911l-93.46-93.46C110.1316,323.08,105.56,345.2073,94.5521,363.7306Z"/><path d="M58.6143,403.6279a6.5743,6.5743,0,0,0-1.2732,7.5013l22.3748,46.4866a6.5746,6.5746,0,0,0,10.5723,1.7965l31.4111-31.4111L77.9706,384.2726Z"/></g></svg>
                </Newicon>

                <Newicon id="4" >
                <svg class="bi bi-eraser-fill" width="30" height="30" fill="currentColor"  viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/></svg>
                </Newicon>

                <Newicon id="5" >
                    <svg fill="none" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M2 8.75C2 5.02208 5.02208 2 8.75 2C12.2244 2 15.0857 4.62504 15.4588 8H12.25C9.90279 8 8 9.90279 8 12.25V15.4588C4.62504 15.0857 2 12.2244 2 8.75Z" fill="#212121"/><path d="M12.25 9C10.4551 9 9 10.4551 9 12.25V18.75C9 20.5449 10.4551 22 12.25 22H18.75C20.5449 22 22 20.5449 22 18.75V12.25C22 10.4551 20.5449 9 18.75 9H12.25Z" fill="#212121"/></svg>
                </Newicon>

                <Newicon id="6" func={showOverlay}>
                    <svg height="30" viewBox="0 0 512 512" width="30" ><title/><path d="M336,256c-20.56,0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62,5.77-47.26,21.14-63.76S312,80,336,80c23.83,0,45.38,9.06,60.7,25.52,15.47,16.62,23,39.22,21.26,63.63h0c-1.67,23.11-10.9,44.77-26,61C376.44,246.82,356.57,256,336,256Zm66-88h0Z"/><path d="M467.83,432H204.18a27.71,27.71,0,0,1-22-10.67,30.22,30.22,0,0,1-5.26-25.79c8.42-33.81,29.28-61.85,60.32-81.08C264.79,297.4,299.86,288,336,288c36.85,0,71,9,98.71,26.05,31.11,19.13,52,47.33,60.38,81.55a30.27,30.27,0,0,1-5.32,25.78A27.68,27.68,0,0,1,467.83,432Z"/><path d="M147,260c-35.19,0-66.13-32.72-69-72.93C76.58,166.47,83,147.42,96,133.45,108.86,119.62,127,112,147,112s38,7.66,50.93,21.57c13.1,14.08,19.5,33.09,18,53.52C213.06,227.29,182.13,260,147,260Z"/><path d="M212.66,291.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46,0-58.07,7.68-80.57,21.62C40.93,316,23.77,339.05,16.84,366.88a27.39,27.39,0,0,0,4.79,23.36A25.32,25.32,0,0,0,41.72,400h111a8,8,0,0,0,7.87-6.57c.11-.63.25-1.26.41-1.88,8.48-34.06,28.35-62.84,57.71-83.82a8,8,0,0,0-.63-13.39C216.51,293.42,214.71,292.45,212.66,291.45Z"/></svg>
                </Newicon>
            </div>
            <div class="overlay">
                <div class="overlay-container">
                    <div class="overlay-title">
                        <div></div>
                        <span>Participants</span>
                        <img on:click={hideOverlay} class="close" src="/images/close.png" alt="close"/>
                    </div>
                    <div class="url-copy">
                        <input placeholder={url}/>
                        <button on:click={()=>navigator.clipboard.writeText(url)}>Copy</button>
                    </div>
                    <div class="p-container">
                        <User name={me.name}/>
                        {#each Object.entries(names) as [id,user]}
                            <User name={user.name}/>
                        {/each}
                    </div>      
                </div>
            </div>
            
        </div>

        {:else}

            <div class="error-main">
                <div >
                    <img src="/images/error.png" alt="error"/>
                    <h2>Board is wiped</h2>
                </div>
            </div>

    {/if}



{/if}

<style>

    .error-main{
        min-height:100vh;
        background-color: #e5e5e5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .error-main img{
        width:40vw;
        height: auto;
    }
    .error-main h2{
        margin-top: 20px;
        font-weight: bold;
        color:#000000;
        text-align: center;
    }


    .toolbar{
        padding: 10px;
        background-color:#eef4ed;
        position: fixed;
        left:20px;
        top:100px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .overlay{
        position: fixed;
        top:0;
        width:100vw;
        height:100vh;
        backdrop-filter: blur(10px);
        background-color:transparent;
        overflow: auto;

    }
    .overlay-container{
        margin:10% auto 0;
        width:350px;
        height:400px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
        padding-top:15px ;
        display: flex;
        flex-direction: column;
        gap:20px;

    }

    .overlay-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: transparent;
        /* margin:0px 15px 30px 10px; */

    }
    .overlay-title span{
        font-size: 1.2rem;
        font-weight: bold;
        background-color: transparent;
    }
    .url-copy{
        display: flex;
        justify-content: center;
        gap:10px;
    }

    .url-copy input{
        width:60%;
        padding: 5px;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 5px;
        border: 1px solid black ;
    }
    .url-copy button{
        border: 0;
        border-radius: 8px;
        padding: 5px;
        font-size: 1.2rem;
        font-weight: bold;
        background-color: chartreuse;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
    .url-copy button:active{
        box-shadow: none;
    }

    .p-container{
        background-color: transparent;
        display: flex;
        flex-direction: column;
        gap:10px;
        flex-grow:1 ;
        overflow:auto;
        border-top: 1px solid black;
        padding-top: 10px;
    }

    .close{
        cursor: pointer;
        width:15px;
        height:15px;
        background-color: transparent;
        margin-right: 10px;
    }

    .board-contai{
        position: relative;
    }

</style>
