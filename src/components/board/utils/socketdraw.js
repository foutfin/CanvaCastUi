


export const drawBoard = (path,canvas,ctx,stroke,color,maincanvas) =>{
    ctx.beginPath();
    ctx.moveTo(path.d.x,path.d.y);
    path.m.forEach((value)=>{      
        ctx.lineTo(value.x,value.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = stroke;  
        ctx.moveTo(value.x,value.y);
    }) 
    ctx.stroke();
    maincanvas.drawImage(canvas,0,0);
}

export const eraseBoard = (path,maincanvas,names) =>{

    Object.entries(names).forEach((value)=>{
        path.m.forEach((v)=>{   
            value[1].ctx.clearRect(v.x, v.y, 20, 20);
            value[1].ctx.beginPath();
        }) 
        
    });
    path.m.forEach((v)=>{   
        maincanvas.clearRect(v.x, v.y, 20, 20);
        maincanvas.beginPath();
    }) 
    
}

export const shapeBoard = (type,path,canvas,ctx,color,stroke,maincanvas) =>{
    if(type == 1){
        lineBoard(path,canvas,ctx,color,stroke,maincanvas);
    }else if(type ==2){
        rectangleBoard(path,canvas,ctx,color,stroke,maincanvas);
    }else if(type == 3){
        circleBoard(path,canvas,ctx,color,stroke,maincanvas);
    }
}


const lineBoard = (path,canvas,ctx,color,stroke,maincanvas) =>{
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

const rectangleBoard = (path,canvas,ctx,color,stroke,maincanvas)=>{
    if(path.m.length > 0){
        ctx.beginPath();
        ctx.moveTo(path.d.x,path.d.y);
        ctx.lineTo(path.m[path.m.length -1].x, path.d.y);
        ctx.lineTo(path.m[path.m.length -1].x, path.m[path.m.length -1].y);
        ctx.lineTo(path.d.x, path.m[path.m.length -1].y);
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = stroke;
        ctx.stroke();
        maincanvas.drawImage(canvas,0,0);
    }
}


const circleBoard = (path,canvas,ctx,color,stroke,maincanvas)=>{
    if(path.m.length > 0){
        const radius = Math.sqrt(((path.m[path.m.length -1].x - path.d.x)*(path.m[path.m.length -1].x - path.d.x)) + ((path.m[path.m.length -1].y - path.d.y)*(path.m[path.m.length -1].y - path.d.y)));
        ctx.beginPath();
        ctx.arc(path.d.x, path.d.y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.lineWidth = stroke;
        ctx.stroke();
        maincanvas.drawImage(canvas,0,0);
    }
}