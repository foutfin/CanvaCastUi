<script>
    import {context,drawing,path} from './stores/store.js';
    import { onMount } from 'svelte';
    let previousx,previousy,currentx,currenty,board,ctx;

    onMount(()=>{
        board = document.getElementById("board-canvas");
        context.update((p)=>board.getContext("2d"))

        const draw = (X,Y)=>{
            previousx = currentx;
            previousy = currenty;
            currentx = X;
            currenty = Y;
            $context.beginPath();
            $context.moveTo(previousx, previousy);
            $context.lineTo(currentx, currenty);
            $context.strokeStyle = 4;
            $context.lineWidth = 4;
            $context.stroke();
            $context.closePath();
        }

        const onMove = (e) =>{
            const X = e.offsetX;
            const Y = e.offsetY;
            draw(X,Y);
            path.update((p)=>{
                p.m.push({x:X,y:Y});
                return p;
            });      
        }
        
        const onMoveTouch = (e) =>{
            let rect = board.getBoundingClientRect();
            let X = e.targetTouches[0].pageX - rect.left;
            let Y = e.targetTouches[0].pageY - rect.top;

            move.update((p)=>{
                return {...p,x:X,y:Y};
            })
        }

        board.addEventListener('mousedown', function(e) {
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

            drawing.update(()=>true);
    
            board.addEventListener('mousemove',onMove);

            board.addEventListener('mouseup', function removeMoveHandler() {
                board.removeEventListener('mousemove', onMove);
                drawing.update(()=>false);
            });

        });


        board.addEventListener('touchstart', function(e) {
            let rect = board.getBoundingClientRect();
            let X = e.targetTouches[0].pageX - rect.left;
            let Y = e.targetTouches[0].pageY - rect.top;

            previous.update((p)=>{
                return {...p,x:X,y:Y};
            })
            current.update((p)=>{
                return {...p,x:X,y:Y};
            })

            
    
            board.addEventListener('touchmove',onMoveTouch);

            board.addEventListener('touchend', function removeMoveHandler() {
                board.removeEventListener('touchmove', onMoveTouch);
                drawing.update(()=>false);
            });

        });

    })

</script>


<style>

</style>

<canvas width="1920" height="1080" id="board-canvas"></canvas>