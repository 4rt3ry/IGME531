import * as svg from "./svg.js"

export class TileSet {
    constructor(width = 1000, height = 1000, tileSize = 50) {
        Object.assign(this, { width, height, tileSize });

    }
    draw(elmId) {
        const shapes = [];
        for (let x = 0; x < this.width; x += this.tileSize) {
            for (let y = 0; y < this.height; y += this.tileSize) {
                let t = svg.transform().translate(x, y);
                if (Math.random() > 0.5)
                    t = t.pivot(x + 25, y + 25).rotate(90);
                shapes.push(svg.group(this.tile(0, x, y), t.transform));

            }
        }
        // shapes.push(svg.group(this.tile(0), svg.transform().pivot(25, 25).rotate(90).transform));
        document.querySelector(`#${elmId}`).innerHTML = svg.svgWrapper(shapes.join(""), this.width, this.height, 0, 0, this.width, this.height);
    }
    tile() {
        const s = this.tileSize;
        const topleft = `M ${s / 2} 0 A ${s / 2} ${s / 2} 0 0 1 0 ${s / 2}`;
        const bottomright = `M ${s} ${s / 2} A ${s / 2} ${s / 2} 0 0 0 ${s / 2} ${s}`;
        return svg.path(`${topleft} ${bottomright}`);
    }
}