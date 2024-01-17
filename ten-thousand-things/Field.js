import { dtr, isFunction, drawCircle, drawLine } from "./utils.js"

export class Field {
    /**
     * Create a new Phylotaxis flower
     * @param {Number} width Width
    //  * @param {Number} height Height
     * @param {Number} divergence Divergence angle
     * @param {Number} n Starting number
     * @param {Number} c Closeness
     * @param {*} color either CSS color string or a callback (n, angle, radius)
     */
    constructor(width, height, c = 5, precision = 10) {
        Object.assign(this, { width, height, c, precision });

        this.textures = [
            {
                uv: [0, 0, 1, 1],
                color: "#32ad5f"
            },
            {
                uv: [-1, 0.4, 0.2, 1],
                color: "#025c75"
            },
            {
                uv: [0.4, 0.3, 0.5, 0.9],
                color: "#ad3261"
            }
        ]
        this.colors = ["#2a63b2", "#329fad", "#0b868e", "#0b868e", "#6addb5", "#edda9c", "#d1350e", "#f94518", "#7f1632"];
    }

    draw(s) {
        let noiseStep = 0.02;
        let noiseX = 0;


        // return;
        for (let x = -50; x < this.width; x += this.c) {
            let noiseY = 0;
            for (let y = -50; y < this.height; y += this.c) {
                // figure out a better way of coloring
                // this.textures.forEach(c => {
                //     if (x > c.uv[0] * this.width && x < c.uv[2] * this.width && y > c.uv[1] * this.height && y < c.uv[3] * this.height) {
                //         s.stroke(c.color);
                //     }
                // });
                const w = y / this.height;
                const r = (s.random() + w * 2) / 3;
                this.colors.forEach((c, i) => {
                    // debugger;
                    if (r > i / this.colors.length && r < (i + 1) / this.colors.length) {
                        s.stroke(c);
                    }
                });
                let cx = x + s.random() * this.c - this.c / 2;
                let cy = y + s.random() * this.c - this.c / 2;
                for (let i = 0; cx < this.width && cy < this.height && i < 15; i++) {
                    let angle = s.noise(cx / 500, cy / 500) * 3.14159 * 2;
                    let nx = cx + s.cos(angle) * 10;
                    let ny = cy + s.sin(angle) * 10;
                    s.line(cx, cy, nx, ny);
                    cx = nx;
                    cy = ny;
                }
                continue;
                s.point(x, y);

                let angle = s.noise(noiseX, noiseY) * 3.14159 * 2;
                s.line(x, y, x + s.cos(angle) * 5, y + s.sin(angle) * 5)

                noiseY += noiseStep;
            }
            noiseX += noiseStep;
        }

    }
}