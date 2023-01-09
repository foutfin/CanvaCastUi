


export const drawBoard = (path,canvas,ctx,stroke,color,maincanvas) =>{
    ctx.beginPath();
    ctx.moveTo(path.d.x,path.d.y);
    path.m.forEach((value)=>{      
        ctx.lineTo(value.x,value.y);
        ctx.moveTo(value.x,value.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = stroke;
        ctx.stroke();
        ctx.closePath();
    }) 
    maincanvas.drawImage(canvas,0,0);
}

export const eraseBoard = (path,canvas,ctx,maincanvas) =>{
    path.m.forEach((value)=>{      
        ctx.clearRect(value.x, value.y, 20, 20);
        maincanvas.clearRect(value.x, value.y, 20, 20);
    }) 
    maincanvas.drawImage(canvas,0,0);
}

export const lineBoard = (path,canvas,ctx,color,stroke,maincanvas) =>{
    if(path.m.length > 0){
        ctx.beginPath();
        ctx.moveTo(path.d.x,path.d.y);
        ctx.lineTo(path.m[path.m.length -1].x,path.m[path.m.length -1].y);
        ctx.strokeStyle = color;
        ctx.lineWidth = stroke;
        ctx.stroke();
        ctx.closePath();
        maincanvas.drawImage(canvas,0,0);
    }
}