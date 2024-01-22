import { dtr, isFunction, drawCircle, drawLine } from "./utils.js"

export class AnimatedField {
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

        this.particles = [];
        for (let x = -50; x < this.width; x += this.c) {
            for (let y = -50; y < this.height; y += this.c) {
                const w = y / this.height;
                const r = (Math.random() + w * 2) / 3;
                let color = "";
                this.colors.forEach((c, i) => {
                    // debugger;
                    if (r > i / this.colors.length && r < (i + 1) / this.colors.length) {
                        color = c;
                    }
                });
                let cx = x + Math.random() * this.c - this.c / 2;
                let cy = y + Math.random() * this.c - this.c / 2;
                this.particles.push({ x: cx, y: cy, color });
            }
        }
    }

    draw(s) {
        // return;
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            let angle = s.noise(p.x / 500, p.y / 500) * Math.PI * 2;
            let nx = p.x + s.cos(angle) * 10;
            let ny = p.y + s.sin(angle) * 10;
            s.stroke(p.color ?? "white");
            s.line(p.x, p.y, nx, ny);
            p.x = nx;
            p.y = ny;

            if (p.x < 0 || p.x > this.width || p.y < 0 || p.y > this.width) {
                this.particles.splice(i, 1);

                continue
                // create new particle on top of screen

                if (Math.random() < 0.5) {
                    let randomPosition = Math.random() * this.width;
                    this.particles.push({ x: randomPosition, y: 0, color: this.getColor(randomPosition) });
                }
                // create new particle on right of screen
                else {
                    let randomPosition = Math.random() * this.height;
                    this.particles.push({ x: this.width, y: randomPosition, color: this.getColor(randomPosition) });
                }
            }
        }
    }

    getColor(y) {
        const w = y / this.height;
        const r = (Math.random() + w * 2) / 3;
        this.colors.forEach((c, i) => {
            // debugger;
            if (r > i / this.colors.length && r < (i + 1) / this.colors.length) {
                return c;
            }
        });
    }
}