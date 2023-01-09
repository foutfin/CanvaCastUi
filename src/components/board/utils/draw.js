
export const draw = (currentx,currenty,X,Y,context,color,stroke)=>{
    context.beginPath();
    context.moveTo(currentx, currenty);
    context.lineTo(X, Y);
    context.strokeStyle = color;
    context.lineWidth = stroke;
    context.stroke();
    context.closePath();
    return [X,Y]
}

export const erase = (X,Y,context)=>{
    context.clearRect(X, Y, 20, 20);
}

export const line = (currentx,currenty,X,Y,overlayBoardContext,color,stroke) =>{
    overlayBoardContext.clearRect(0, 0, 1920, 1080);
    overlayBoardContext.lineTo(X, Y);
    overlayBoardContext.strokeStyle = color;
    overlayBoardContext.lineWidth = stroke;
    overlayBoardContext.stroke();
    overlayBoardContext.closePath();
    overlayBoardContext.beginPath();
    overlayBoardContext.moveTo(currentx,currenty);
}

