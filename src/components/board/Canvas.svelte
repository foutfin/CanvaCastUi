<script>
    import {context,drawing,path,pen,cvs} from './stores/store.js';
    import { onMount } from 'svelte';
    import {draw,erase,line} from './utils/draw.js';
    let currentx,currenty;

    onMount(()=>{
        const board = document.getElementById("board-canvas");
        context.update((p)=>board.getContext("2d"));
        cvs.update(()=>board);

        const overlayBoard = document.getElementById("board-overlay");
        const overlayBoardContext = overlayBoard.getContext("2d");
        
        const onMove = (e) =>{
            const X = e.offsetX;
            const Y = e.offsetY;
            if($pen.type == 2 | $pen.type == 3){
                [currentx,currenty] = draw(currentx,currenty,X,Y,$context,$pen.color,$pen.stroke);
            }else if($pen.type == 4){
                erase(X,Y,$context); 
            }else if($pen.type == 5){
                line(currentx,currenty,X,Y,overlayBoardContext,$pen.color,$pen.stroke);                 
            }
            path.update((p)=>{
                    p.m.push({x:X,y:Y});
                    return p;
            });                 
        }
        
        const onMoveTouch = (e) =>{
            let rect = board.getBoundingClientRect();
            let X = e.targetTouches[0].pageX - rect.left;
            let Y = e.targetTouches[0].pageY - rect.top;

            if($pen.type == 2 | $pen.type == 3){
                draw(X,Y);
            }else if($pen.type == 4){
                erase(X,Y); 
            }else if($pen.type == 5){
                line(X,Y);                 
            }
            path.update((p)=>{
                    p.m.push({x:X,y:Y});
                    return p;
            }); 
        }

        overlayBoard.addEventListener('mousedown', function(e) {
            const X = e.offsetX;
            const Y = e.offsetY;
            currentx = X;
            currenty = Y;

            path.update((p)=>{
                    if(p){
                        return {...p,d:{x:X,y:Y}};
                    }
                    return {d:{x:X,y:Y},m:[]};
                })

            if($pen.type == 5){
                overlayBoardContext.beginPath();
                overlayBoardContext.moveTo(X,Y);
            }
            

            drawing.update(()=>true);
    
            overlayBoard.addEventListener('mousemove',onMove);

            overlayBoard.addEventListener('mouseup', function removeMoveHandler() {
                overlayBoard.removeEventListener('mousemove', onMove);
                drawing.update(()=>false);
                if($pen.type == 5){
                    $context.drawImage(overlayBoard,0,0);
                    overlayBoardContext.clearRect(0, 0, 1920, 1080);
                }
            });
            overlayBoard.addEventListener('mouseout', function removeMoveHandler() {
                overlayBoard.removeEventListener('mousemove', onMove);
                drawing.update(()=>false);
                if($pen.type == 5){
                    $context.drawImage(overlayBoard,0,0);
                    overlayBoardContext.clearRect(0, 0, 1920, 1080);
                }
            });

        });

        board.addEventListener('touchstart', function(e) {
            let rect = board.getBoundingClientRect();
            let X = e.targetTouches[0].pageX - rect.left;
            let Y = e.targetTouches[0].pageY - rect.top;

            currentx = X;
            currenty = Y;
            
            board.addEventListener('touchmove',onMoveTouch);

            board.addEventListener('touchend', function removeMoveHandler() {
                board.removeEventListener('touchmove', onMoveTouch);
                drawing.update(()=>false);
                if($pen.type == 5){
                    $context.drawImage(overlayBoard,0,0);
                    overlayBoardContext.clearRect(0, 0, 1920, 1080);
                }                
            });
        });

    })

</script>

<style>
    #board-canvas{
        background-color: #fff;
        touch-action:auto;
    }
    .boards{
        position:absolute;
        top:0;
        left: 0;
    }

    #board-overlay{
        background-color: transparent;
    }

</style>

<canvas width="1920" height="1080" id="board-canvas" class="boards"></canvas>
<canvas width="1920" height="1080" id="board-overlay" class="boards"></canvas>