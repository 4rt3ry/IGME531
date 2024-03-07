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
        this.data = 'X'
    }
    draw(selector, centerX, centerY, transformFunction) {
        const angleDiff = 360 / 6;
        const shapes = []
        for (let i = 0; i < 360; i+= angleDiff) {
            const t = (transformFunction ? transformFunction(i) : svg.transform().rotate(-25).translate(-100, 0).rotate(i)).translate(centerX, centerY).transform;
            shapes.push(svg.group(this.getFractal(), t));
        }
        document.querySelector(`${selector}`).innerHTML = svg.svgWrapper(shapes.join(""), this.width, this.height, 0, 0, this.width, this.height);

    }
    getFractal() {
        const length = 2;
        const shapes = [];
        const stack = [];
        let angle = this.angle;
        let p = [0, 0] // starting point
        for (let i of this.data) {
            switch (i) {
                case '+': angle += this.angle; break;
                case '-': angle -= this.angle; break;
                case '[': stack.push({ point: [p[0], p[1]], angle }); break;
                case ']':
                    let d = stack.pop();
                    angle = d.angle;
                    p = d.point;
                    break;
                case 'F':
                    let x = p[0];
                    let y = p[1];
                    p[0] += Math.cos(angle) * length;
                    p[1] += Math.sin(angle) * length;
                    shapes.push(svg.line(x, y, p[0], p[1], `rgb(${255 - stack.length * 20 - 20}, ${20}, ${100})`));
                    break;
            }
        }

        return shapes.join("");
        document.querySelector(`${selector}`).innerHTML = svg.svgWrapper(shapes.join(""), this.width, this.height, xOffset, yOffset, this.width, this.height);

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