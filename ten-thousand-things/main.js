import { Field } from "./Field.js";
const canvasWidth = 1920, canvasHeight = 1080;

let ctx;
const fields = [
    new Field(canvasWidth + 100, canvasHeight + 100)
];

const main = s => {
    let bg;
    let win = {};
    let seed = 5;
    s.setup = () => {
        bg = document.querySelector("#canvas");
        win.w = canvasWidth;
        win.h = canvasHeight;

        let canvas = s.createCanvas(win.w, win.h);
        canvas.parent(bg);

        s.noiseSeed(s.random() * 500);
        s.background("#329fad");
        s.stroke(0);
        console.log(s.noise(5, 5))
    }
    s.draw = () => {
        fields.forEach(field => field.draw(s));
        s.noLoop();
    }
}

let sketch = new p5(main);

// Setup
// ctx = canvas.getContext("2d");
// canvas.width = canvasWidth;
// canvas.height = canvasHeight;
// // ctx.fillStyle = "white";
// ctx.fillRect(0, 0, canvasWidth, canvasHeight);


// const loop = () => {
//     // setTimeout(loop, 1000 / 30);
//     // console.log
//     fields.forEach(field => field.draw(ctx));
// }
// loop();