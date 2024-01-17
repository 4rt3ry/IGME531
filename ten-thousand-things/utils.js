

export const dtr = degrees => degrees * (Math.PI / 180);

export const isFunction = func => !!(func && func.constructor && func.call && func.apply);

export const drawCircle = (ctx, x, y, radius, color = "white") => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
export const drawLine = (ctx, fromx, fromy, tox, toy, strokeStyle = "rgb(0, 0, 0)", lineWidth = 1) => {
    ctx.save();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}