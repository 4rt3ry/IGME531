import * as svg from "./svg.js"
import * as perlin from "https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.0.0/simplex-noise.js"

class FlowField {
    /**
 * Create a new Phylotaxis flower
 * @param {Number} width Width
//  * @param {Number} height Height
 * @param {Number} divergence Divergence angle
 * @param {Number} n Starting number
 * @param {Number} c Closeness
 * @param {*} color either CSS color string or a callback (n, angle, radius)
 */
    constructor(width, height, c = 5, precision = 10, length = 10, randomness = 5) {
        Object.assign(this, { width, height, c, precision, length, randomness });

        this.textures = [
            {
                uv: [0, 0, 1, 1],
                color: "#51006c"
            },
            {
                uv: [-1, 0.4, 0.2, 1],
                color: "#FF3056"
            },
            {
                uv: [0.4, 0.3, 0.5, 0.9],
                color: "#0E6769"
            }
        ]
        this.colors = ["#51006c20", "#FF305620", "#0E676920"];

        this.gridWidth = Math.floor(width / c);
        this.gridHeight = Math.floor(height / c);

        this.points = Array.from({ length: this.gridWidth * this.gridHeight })
            .map((_, i) => {
                return [i % Math.floor(this.gridWidth), i / Math.floor(this.gridWidth)]
            })
            .map((p) => {
                return [p[0] * this.c, p[1] * this.c]
            })
            .map((p) => {
                return [p[0] + Math.random() * this.randomness - this.randomness / 2, p[1] + Math.random() * this.randomness - this.randomness / 2]
            })
    }

    draw(elmId) {
        const noise = new SimplexNoise();
        const shapes = [];
        this.points.forEach(p => {
            let x = p[0];
            let y = p[1];

            let color = "#000000";
            const r = Math.random();
            this.colors.forEach((c, i) => {
                // debugger;
                if (r > i / this.colors.length && r < (i + 1) / this.colors.length) {
                    color = c;
                }
            });

            // let path = `M ${x} ${y} `;
            for (let i = 0; i < this.length; i++) {
                let angle = noise.noise2D(x * 0.002, y * 0.002) * 3.14;
                let cx = x + Math.cos(angle) * this.precision;
                let cy = y + Math.sin(angle) * this.precision;
                shapes.push(svg.line(x, y, cx, cy, color));
                // path += `T ${cx} ${cy} `
                x = cx; y = cy;
            }
            // shapes.push(svg.path(path, `stroke="${color}" fill="transparent"`));
        });

        document.querySelector(`#${elmId}`).innerHTML = svg.svgWrapper(shapes.join(""), this.width, this.height, 0, 0, this.width, this.height);
    }
}

export { FlowField }