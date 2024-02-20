import * as svg from "./svg.js"

const sq3 = Math.sqrt(3)

export class HexagonTruchet {
    constructor(width = 1000, height = 1000, apothem = 50) {
        Object.assign(this, { width, height, apothem, side: apothem * sq3 / 2 });

    }
    draw(elmId) {
        const shapes = [];
        shapes.push(svg.group(this.tile(), svg.transform().translate(200, 200).transform));
        const rowHeight = this.height / this.apothem / 2;
        for(let y = 0; y < rowHeight; y ++) {
            let rowOffset = (y % 2) * (this.apothem + this.side / 2);
            let rowWidth = rowHeight - Math.abs(rowHeight / 2 - y) - 2;
            // let left = row;
            // let right = this.width / 2 + rowWidth / 2
            for(let x = 0; x < rowWidth; x ++) {
                let t = svg.transform().translate(x * (this.apothem * 3) + rowOffset, y * this.side);
                shapes.push(svg.group(this.tile(), t.transform));
            }
        }
        // for (let x = 0; x < this.width; x += this.tileSize) {
        //     for (let y = 0; y < this.height; y += this.tileSize) {
        //         let t = svg.transform().translate(x, y);
        //         if (Math.random() > 0.5)
        //             t = t.pivot(x + 25, y + 25).rotate(90);
        //         shapes.push(svg.group(this.tile(0, x, y), t.transform));

        //     }
        // }
        // shapes.push(svg.group(this.tile(0), svg.transform().pivot(25, 25).rotate(90).transform));
        document.querySelector(`#${elmId}`).innerHTML = svg.svgWrapper(shapes.join(""), this.width, this.height, 0, 0, this.width, this.height);
    }
    tile(n = 0) {
        // if (n === 0) {

        // }
        let shape = "";
        const s = this.apothem;
        const o = 0; // angle offset
        const a = Math.PI / 3; // angle per iteration
        for (let i = 0; i < 6; i++) {
            const x1 = Math.cos(i * a + o) * this.apothem;
            const y1 = Math.sin(i * a + o) * this.apothem;
            const x2 = Math.cos((i + 1) * a + o) * this.apothem;
            const y2 = Math.sin((i + 1) * a + o) * this.apothem;
            shape += svg.line(x1, y1, x2, y2);
        }
        return shape;
        // const topleft = `M ${s / 2} 0 A ${s / 2} ${s / 2} 0 0 1 0 ${s / 2}`;
        // const bottomright = `M ${s} ${s / 2} A ${s / 2} ${s / 2} 0 0 0 ${s / 2} ${s}`;
        // return svg.path(`${topleft} ${bottomright}`);
    }
}