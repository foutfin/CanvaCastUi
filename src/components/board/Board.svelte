<script>
    import {context,drawing,path} from './stores/store.js';
    export let name,boardName,isAdmin,boardId;

    
    import { onMount } from "svelte";
    import Canvas from "./Canvas.svelte";
    import User from "./User.svelte";
    import Icon from "./Icon.svelte";

    let names = {};
    let me ={};
    let connected = false;
    let selected = 1;
    const domain="canvacastserver-production.up.railway.app";
    const socketurl = `wss://${domain}/join/${boardId}`;
    const url = `https://${domain}/board/${boardId}`;

    onMount(()=>{
        const socket = new WebSocket(socketurl);

        //canvas create for each new user joined
        const createBoard =()=>{
            const c = document.createElement('canvas');
            c.setAttribute("width","1920");
            c.setAttribute("height","1080");
            return c;
        }

        const renderBoard = (path,canvas,ctx) =>{
            ctx.beginPath();
            ctx.moveTo(path.d.x,path.d.y);
            path.m.forEach((value)=>{      
                ctx.lineTo(value.x,value.y);
                ctx.moveTo(value.x,value.y);
                ctx.strokeStyle = 4;
                ctx.lineWidth = 4;
                ctx.stroke();
                ctx.closePath();
            }) 
            $context.drawImage(canvas,0,0);
        }

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
                                 i : me.id,
                            }
                    socket.send(JSON.stringify(mes));
                    console.log(mes);
                    path.update(()=>{
                        return {"d":{x:0,y:0},"m":[]};
                    })
                }
                }
            })

        });
        socket.addEventListener("message",(ev)=>{
            let data = JSON.parse(ev.data);
            console.log(data);
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
                connected = true;
                console.log("User added");
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
                renderBoard(data.d,names[data.i].canvas,names[data.i].ctx);

            }else if(data.a === "leaved"){
                delete names[data.id];
                names = names;
            }
        });
        socket.addEventListener("close",()=>{
            connected = false;
            console.log("closed");
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

    const test = (e)=>{
        selected = e.target.id;
        console.log(selected,e.target);
    }
</script>

<div class="main">  
    <div class="toolbar">
        <Icon id="1" sel={selected} on:click={test} src="/images/pencil.png"/>
        <Icon id="2" sel={selected} on:click={test} src="/images/marker.png"/>
        <Icon id="3" sel={selected} on:click={test} src="/images/eraser.png"/>
        <Icon id="4" sel={selected} on:click={showOverlay} animate={false} src="/images/people.png"/>
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
    <div class="board-contai">
        <Canvas/>
    </div>
</div>

<style>
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
        background-color: #fff;
        border:3px solid green;
    }

</style>
