import * as svg from "./svg.js"

const sq3 = Math.sqrt(3)

export class HexagonTruchet {
    constructor(width = 1000, height = 1000, apothem = 50, spacing = 1) {
        Object.assign(this, { width, height, apothem, side: apothem / sq3 * 2 * spacing, spacing});
        this.shapes = [];
    }
    draw(selector) {
        document.querySelector(`${selector}`).innerHTML = svg.svgWrapper(this.shapes.join(""), this.width, this.height, 0, 0, this.width, this.height);
        this.shapes = [];
    }
    tileDemo(xOffset = 0, yOffset = 0) {
        const mx = this.width / 2;
        const my = this.height / 2;
        const ox = -100;
        for (let i = 0; i < 5; i++) {
            this.shapes.push(svg.group(this.tile(i, 0), svg.transform().translate(mx + i * 50 + ox, my).translate(xOffset, yOffset).transform));
        }
        document.querySelector(`${elmId}`).innerHTML = svg.svgWrapper(shapes.join(""), this.width, this.height, 0, 0, this.width, this.height);
    }
    radialGrid(radius = 3, xOffset = 0, yOffset = 0, tileSelectionCallback = undefined, tileModeCallback = undefined, radialScaling = false) {
        radius = Math.min(Math.max(radius, 1), 16);
        const mx = this.width / 2; // middle x, middle y
        const my = this.height / 2;
        const rIncrement = this.apothem * 2; // radial increment distance
        const ao = Math.PI / 6; // angle offset
        const ha = Math.PI / 3; // hexagon angle
        const hoa = Math.PI * 2 / 3; // hexagon offset angle, used for drawing hexagons semi-perpendicular to radius
        this.shapes.push(svg.group(this.tile(0, 0), svg.transform().translate(mx, my).translate(xOffset, yOffset).transform));
        for (let i = 0; i < radius; i++) {
            const ii = i + 1;
            for (let j = 0; j < 6 * i; j++) {
                const n = j % i || 0;
                const angle = Math.floor(j / i || 0) * ha;
                const x = Math.cos(angle + ao) * i * rIncrement + mx + Math.cos(angle - hoa + ao) * n * rIncrement;
                const y = Math.sin(angle + ao) * i * rIncrement + my + Math.sin(angle - hoa + ao) * n * rIncrement;
                if (radialScaling)
                this.spacing = 2 - Math.sqrt(Math.pow(x - mx, 2) + Math.pow(y - my, 2)) / rIncrement / radius;

                // this.shapes.push(svg.group(this.tile(Math.random() * 8, j), svg.transform().translate(x, y).transform));
                let tileType = i * 0.74;
                if (tileSelectionCallback) tileType = tileSelectionCallback(i, j);
                let tileMode = j;
                if (tileModeCallback) tileMode = tileModeCallback(i, j);

                this.shapes.push(svg.group(this.tile(tileType, tileMode), svg.transform().translate(x, y).translate(xOffset, yOffset).transform));
                // this.shapes.push(svg.group(this.tile(0, i), svg.transform().translate(x, y).transform));
            }
        }
        // document.querySelector(`${elmId}`).innerHTML = svg.svgWrapper(shapes.join(""), this.width, this.height, 0, 0, this.width, this.height);

    }
    hexTile = () => {
        let shape = "";
        const color = "#eee"
        // draw a light color hexagon for debugging
        for (let i = 0; i < 6; i++) {
            const x1 = Math.cos(i * Math.PI / 3) * this.side * this.spacing;
            const y1 = Math.sin(i * Math.PI / 3) * this.side * this.spacing;
            const x2 = Math.cos((i + 1) * Math.PI / 3) * this.side * this.spacing;
            const y2 = Math.sin((i + 1) * Math.PI / 3) * this.side * this.spacing;
            shape += svg.line(x1, y1, x2, y2, color);
        }
        return shape;
    }
    tile(n = 0, r = 0) {
        let shape = "";
        r = Math.floor(r) % 2;
        n = Math.floor(n) % 5;
        const color = "#000000"

        if (n === 0) {
            // shape += this.hexTile();
            const a = Math.PI / 3; // angle per iteration
            const ao = -Math.PI / 2 + a * r;
            for (let i = 0; i < 6; i += 2) {
                let ii = i + 1;
                let sa = i * a + ao;
                let na = ii * a + ao;
                const sx = Math.cos(sa) * this.apothem * this.spacing;
                const sy = Math.sin(sa) * this.apothem * this.spacing;
                const nx = Math.cos(na) * this.apothem * this.spacing;
                const ny = Math.sin(na) * this.apothem * this.spacing;
                // const sx1 = Math.cos(sa) * this.apothem * this.spacing + Math.cos(sa + Math.PI / 2) * 2;
                // const sy1 = Math.sin(sa) * this.apothem * this.spacing + Math.sin(sa + Math.PI / 2) * 2;
                // const nx1 = Math.cos(na) * this.apothem * this.spacing + Math.cos(na - Math.PI / 2) * 2;
                // const ny1 = Math.sin(na) * this.apothem * this.spacing + Math.sin(na - Math.PI / 2) * 2;

                // shape += svg.path(`M ${sx} ${sy} L ${nx} ${ny}`);
                shape += svg.path(`M ${sx} ${sy} A ${this.side / 2} ${this.side / 2} 0 0 0 ${nx} ${ny}`, `style="stroke:${color};fill:none"`)
                // shape += svg.path(`M ${sx1} ${sy1} A ${this.side / 2 * 0.8} ${this.side / 2 * 0.8} 0 0 0 ${nx1} ${ny1}`)
            }
        }
        if (n === 1) {
            // shape += this.hexTile();
            const a = Math.PI / 3; // angle per iteration
            const ao = -Math.PI / 2 + a;
            for (let i = 0; i < 6; i += 2) {
                let ii = i + 1;
                let sa = i * a + ao;
                let na = ii * a + ao
                const sx = Math.cos(sa) * this.apothem * this.spacing;
                const sy = Math.sin(sa) * this.apothem * this.spacing;
                const nx = Math.cos(na) * this.apothem * this.spacing;
                const ny = Math.sin(na) * this.apothem * this.spacing;
                // const sx1 = Math.cos(sa) * this.apothem * this.spacing + Math.cos(sa + Math.PI / 2) * 2;
                // const sy1 = Math.sin(sa) * this.apothem * this.spacing + Math.sin(sa + Math.PI / 2) * 2;
                // const nx1 = Math.cos(na) * this.apothem * this.spacing + Math.cos(na - Math.PI / 2) * 2;
                // const ny1 = Math.sin(na) * this.apothem * this.spacing + Math.sin(na - Math.PI / 2) * 2;

                // shape += svg.path(`M ${sx} ${sy} L ${nx} ${ny}`);
                shape += svg.path(`M ${sx} ${sy} A ${this.side / 2} ${this.side / 2} 0 0 0 ${nx} ${ny}`, `style="stroke:${color};fill:none"`)
                // shape += svg.path(`M ${sx1} ${sy1} A ${this.side / 2 * 0.8} ${this.side / 2 * 0.8} 0 0 0 ${nx1} ${ny1}`)
            }
        }
        if (n === 2) {
            // shape += this.hexTile();
            const a = Math.PI / 3; // angle per iteration
            const ao = -Math.PI / 2 + Math.PI / 3 * r;

            for (let i = 0; i < 6; i += 2) {
                let ii = i + 2;
                let sa = i * a + ao + a;
                let na = ii * a + ao + a;
                const sx = Math.cos(sa) * this.apothem * this.spacing;
                const sy = Math.sin(sa) * this.apothem * this.spacing;
                const nx = Math.cos(na) * this.apothem * this.spacing;
                const ny = Math.sin(na) * this.apothem * this.spacing;
                const lx1 = Math.cos(sa + a) * this.apothem * this.spacing;
                const ly1 = Math.sin(sa + a) * this.apothem * this.spacing;
                const lx2 = Math.cos(sa + a) * this.apothem * this.spacing * 0.5;
                const ly2 = Math.sin(sa + a) * this.apothem * this.spacing * 0.5;
                const lx3 = Math.cos(sa + a) * this.apothem * this.spacing * 0.2;
                const ly3 = Math.sin(sa + a) * this.apothem * this.spacing * 0.2;

                // shape += svg.path(`M ${sx} ${sy} L ${nx} ${ny}`);
                shape += svg.path(`M ${sx} ${sy} A ${this.side * 2} ${this.side * 2} 0 0 0 ${nx} ${ny}`, `style="stroke:${color};fill:none"`);
                shape += svg.line(lx1, ly1, lx2, ly2, color);
                shape += svg.line(lx3, ly3, 0, 0, color);

                // shape += svg.path(`M ${sx1} ${sy1} A ${this.side / 2} ${this.side / 2} 0 0 0 ${nx1} ${ny1}`)
            }
        }
        if (n === 3) {
            // shape += this.hexTile();
            const a = Math.PI / 3; // angle per iteration
            const ao = -Math.PI / 2 + Math.PI / 3 * r;

            for (let i = 0; i < 6; i += 2) {
                let ii = i + 1;
                let iii = i + 2;
                let sa = i * a + ao + a;
                let na = iii * a + ao + a;
                let na2 = ii * a + ao + a;
                const sx = Math.cos(sa) * this.apothem * this.spacing;
                const sy = Math.sin(sa) * this.apothem * this.spacing;
                const nx = Math.cos(na) * this.apothem * this.spacing;
                const ny = Math.sin(na) * this.apothem * this.spacing;
                const sx1 = Math.cos(na2) * this.apothem * this.spacing;
                const sy1 = Math.sin(na2) * this.apothem * this.spacing;
                const sx2 = Math.cos(sa + a) * this.apothem * this.spacing * 0.5;
                const sy2 = Math.sin(sa + a) * this.apothem * this.spacing * 0.5;
                const lx3 = Math.cos(sa + a) * this.apothem * this.spacing * 0.2;
                const ly3 = Math.sin(sa + a) * this.apothem * this.spacing * 0.2;

                // shape += svg.path(`M ${sx} ${sy} L ${nx} ${ny}`);
                // shape += svg.path(`M ${sx} ${sy} A ${this.side * 2} ${this.side * 2} 0 0 0 ${nx} ${ny}`);
                shape += svg.path(`M ${sx} ${sy} A ${this.side / 2} ${this.side / 2} 0 0 0 ${sx1} ${sy1}`, `style="stroke:${color};fill:none"`);
                shape += svg.line(0, 0, sx, sy, color);
                // shape += svg.line(lx3, ly3, 0, 0);

                // shape += svg.path(`M ${sx1} ${sy1} A ${this.side / 2} ${this.side / 2} 0 0 0 ${nx1} ${ny1}`)
            }
        }
        if (n === 4) {
            // shape += this.hexTile();
            const a = Math.PI / 3; // angle per iteration
            const ao = -Math.PI / 2 + Math.PI / 3 * r;

            for (let i = 0; i < 6; i += 2) {
                let ii = i + 1;
                let iii = i + 2;
                let sa = i * a + ao + a;
                let na = iii * a + ao + a;
                let na2 = ii * a + ao + a;
                const sx = Math.cos(sa) * this.apothem * this.spacing;
                const sy = Math.sin(sa) * this.apothem * this.spacing;
                const nx = Math.cos(na) * this.apothem * this.spacing;
                const ny = Math.sin(na) * this.apothem * this.spacing;
                const sx1 = Math.cos(na2) * this.apothem * this.spacing;
                const sy1 = Math.sin(na2) * this.apothem * this.spacing;
                const lx2 = Math.cos(sa + a) * this.apothem * this.spacing;
                const ly2 = Math.sin(sa + a) * this.apothem * this.spacing;
                const lx3 = Math.cos(sa + a) * this.apothem * this.spacing * 0.3;
                const ly3 = Math.sin(sa + a) * this.apothem * this.spacing * 0.3;

                // shape += svg.path(`M ${sx} ${sy} L ${nx} ${ny}`);
                // shape += svg.path(`M ${sx} ${sy} A ${this.side * 2} ${this.side * 2} 0 0 0 ${nx} ${ny}`);
                // shape += svg.path(`M ${sx} ${sy} A ${this.side / 2} ${this.side / 2} 0 0 0 ${sx1} ${sy1}`);
                shape += svg.line(0, 0, sx, sy, color);
                shape += svg.line(lx2, ly2, lx3, ly3, color);

                // shape += svg.path(`M ${sx1} ${sy1} A ${this.side / 2} ${this.side / 2} 0 0 0 ${nx1} ${ny1}`)
            }
        }
        return shape;
        // const topleft = `M ${s / 2} 0 A ${s / 2} ${s / 2} 0 0 1 0 ${s / 2}`;
        // const bottomright = `M ${s} ${s / 2} A ${s / 2} ${s / 2} 0 0 0 ${s / 2} ${s}`;
        // return svg.path(`${topleft} ${bottomright}`);
    }
}