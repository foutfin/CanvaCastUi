import {previous,current,move,context} from './stores/store.js';


const draw = (ony,ony,prevx,prevy,curx,cury,context)=>{
    console.log("i ran for ",presentx,presenty);

    current.

    previous.update((p)=>{
        return {...p,x:e.offsetX,y:e.offsetY};
    })
    current.update((p)=>{
        return {...p,x:e.offsetX,y:e.offsetY};
    })

    prevx = currentx;
    prevy = currenty;
    curx = onx;
    cury = ony;
    context.beginPath();
    context.moveTo(previousx, previousy);
    context.lineTo(currentx, currenty);
    context.strokeStyle = 4;
    context.lineWidth = 4;
    context.stroke();
    context.closePath();
}



