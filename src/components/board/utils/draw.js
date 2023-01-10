
export const draw = (X,Y,context,color,stroke)=>{
    context.lineTo(X, Y);
    context.strokeStyle = color;
    context.lineWidth = stroke;
    context.lineCap = 'round';
    context.stroke();
    context.moveTo(X, Y);
}

export const erase = (X,Y,context,usa)=>{
    Object.entries(usa).forEach((value)=>{
        value[1].ctx.clearRect(X, Y, 20, 20);
        value[1].ctx.beginPath();
    })

    context.clearRect(X, Y, 20, 20);
    context.beginPath();
}

export const shape = (type,currentx,currenty,X,Y,overlayBoardContext,color,stroke) =>{
    if(type == 1){
        line(currentx,currenty,X,Y,overlayBoardContext,color,stroke);
    }else if(type ==2){
        rectangle(currentx,currenty,X,Y,overlayBoardContext,color,stroke)
    }else if(type == 3){
        circle(currentx,currenty,X,Y,overlayBoardContext,color,stroke);
    }
}


const line = (currentx,currenty,X,Y,overlayBoardContext,color,stroke) =>{
    overlayBoardContext.clearRect(0, 0, 1920, 1080);
    overlayBoardContext.lineTo(X, Y);
    overlayBoardContext.strokeStyle = color;
    overlayBoardContext.lineWidth = stroke;
    overlayBoardContext.stroke();
    overlayBoardContext.closePath();
    overlayBoardContext.beginPath();
    overlayBoardContext.moveTo(currentx,currenty);
}

const rectangle = (currentx,currenty,X,Y,overlayBoardContext,color,stroke)=>{

    overlayBoardContext.clearRect(0, 0, 1920, 1080);
    overlayBoardContext.lineTo(X, currenty);
    overlayBoardContext.lineTo(X, Y);
    overlayBoardContext.lineTo(currentx, Y);
    overlayBoardContext.closePath();
    overlayBoardContext.strokeStyle = color;
    overlayBoardContext.lineWidth = stroke;
    overlayBoardContext.stroke();
    overlayBoardContext.beginPath();
    overlayBoardContext.moveTo(currentx,currenty);

}

const circle  = (currentx,currenty,X,Y,overlayBoardContext,color,stroke)=>{
    const radius = Math.sqrt(((X-currentx)*(X-currentx)) + ((Y-currenty)*(Y-currenty)));
    overlayBoardContext.clearRect(0, 0, 1920, 1080);
    overlayBoardContext.arc(currentx, currenty, radius, 0, 2 * Math.PI);
    overlayBoardContext.strokeStyle = color;
    overlayBoardContext.lineWidth = stroke;
    overlayBoardContext.stroke();
    overlayBoardContext.beginPath();
}

