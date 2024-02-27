import * as svg from './svg.js'

class FractalPlant {
    constructor(width, height) {
        Object.assign(this, { width, height });
        this.vars = ['X', 'F', '+', '-', '[', ']'];
        this.rules = {
            'X': 'F+[[X]-X]-F[-FX]+X',
            'F': 'FF'
        }
        this.angle = 25 * Math.PI / 180;
        this.data = 'XF'
    }
    draw(selector) {
        const length = 5;
        const shapes = [];
        const stack = [];
        let angle = this.angle;
        let p = [0, 0] // starting point
        for (let i of this.data) {
            switch (i) {
                case '+': angle += this.angle; break;
                case '-': angle -= this.angle; break;
                case '[': stack.push({ p, angle }); break;
                case ']':
                    let d = stack.pop();
                    angle = d.angle;
                    p = d.p;
                    break;
                case 'F':
                    let x = p[0];
                    let y = p[1];
                    p[0] += Math.cos(angle) * length;
                    p[1] += Math.sin(angle) * length;
                    shapes.push(svg.line(x, y, p[0], p[1]))
                    break;
            }
        }

        document.querySelector(`${selector}`).innerHTML = svg.svgWrapper(shapes.join(""), this.width, this.height, 0, 0, this.width, this.height);

    }
    compile(iterations = 1) {
        iterations = Math.max(0, Math.min(iterations, 10));
        for (let i = 0; i < iterations; i++) this.data = this.iterate(this.data);

    }
    iterate(data) {
        let result = '';
        for (let i of data) {
            if (this.rules[i])
                result += this.rules[i]
            else
                result += i;
        }
        return result;
    }
}

export { FractalPlant }