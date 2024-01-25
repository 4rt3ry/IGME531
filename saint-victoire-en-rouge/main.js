
const main = () => {
    DrawOriginal("original");
    variation1("variation-1");
    variation2("variation-2");
}

const DrawOriginal = (selector) => {
    const shapes = [
        rect(250, 60, 200, 200, -20, "#5e1626"),
        rect(400, 50, 200, 200, -5, "#c9111dec"),
        rect(155, 320, 200, 200, 5, "#c9111e"),
        rect(470, 415, 200, 200, -25, "#5e1626"),
        rect(550, 380, 200, 200, 5, "#5e1626"),
        rect(220, 200, 200, 200, -45, "#ff4739"),
        rect(480, 210, 200, 200, -10, "#ff4739"),
        rect(580, 560, 200, 200, 40, "#b80f1a"),
        rect(680, 570, 200, 200, 15, "#e7000f")
    ];

    document.querySelector(`#${selector}`).innerHTML = createSVG(shapes, 600, 600, 0, 0, 1000, 1000);
}

/**
 * Draw a statically generated particle system
 * @param {*} selector
 */
const variation1 = (selector) => {
    let shapes = [];
    let time = 0;
    const gravity = 10;

    for (let i = 0; i < 20; i++) {
        // a random acute angle used to determine velocity
        const direction = Math.random() * Math.PI * 0.8 + Math.PI * 0.2;
        const velocity = [Math.cos(direction) * 50, Math.sin(direction) * 50];
        const rotation = Math.random() * 360;

        // simulate gravity for a particle system
        const x = velocity[0] * time + 500;
        const y = velocity[1] * time + gravity * time * time / 2;

        // add shape
        shapes.push(rect(x, y, 100, 100, rotation, getColor()));

        time += 0.5;
    }

    document.querySelector(`#${selector}`).innerHTML = createSVG(shapes, 600, 600, 0, 0, 1000, 1000);
}

/**
 * Make a spiral shape
 * @param {*} selector 
 */
const variation2 = (selector) => {
    let shapes = [];
    const rotations = 1.78;
    const increment = Math.PI / 8; // radians
    let radius = 50;

    // make a spiral!
    for (let i = 0; i <= rotations * Math.PI * 2; i += increment) {
        const x = Math.cos(i) * radius + 500;
        const y = Math.sin(i) * radius + 550;

        const randShape = Math.random() * 5; // 5 types of shapes
        const rotation = Math.random() * 360;
        if (randShape < 1) {
            shapes.push(circle(x, y, 50, getColor()));
        }
        else if (randShape < 2) {
            shapes.push(rect(x - 50, y - 50, 100, 100, rotation, getColor()))
        }
        else if (randShape < 3) {
            shapes.push(ellipse(x, y, 50, Math.random() * 30 + 20, rotation, getColor()))
        }
        else if (randShape < 4) {
            // create polygon with up to 8 vertices
            let points = [];
            let numVerts = Math.floor(Math.random() * 5 + 3);
            for (let i = 0; i < numVerts; i++) {
                const rotation = i / numVerts * Math.PI * 2 + Math.random() * 0.4 - 0.2;
                const radius = 50;
                points.push([x + Math.cos(rotation) * radius, y + Math.sin(rotation) * radius]);
            }
            shapes.push(poly(points, 0, getColor()));
        }
        else {

            // create 3 lines
            shapes.push(`<g transform="rotate(${rotation},${x},${y})">
            ${[
                    line(x - 50, y - Math.random() * 30 - 20, x + 50, y - Math.random() * 30 - 20, getColor(), 3),
                    line(x - 50, y - Math.random() * 30 + 15, x + 50, y - Math.random() * 30 + 20, getColor(), 3),
                    line(x - 50, y + Math.random() * 30 + 20, x + 50, y + Math.random() * 30 + 20, getColor(), 3)
                ].join("")
                }
            </g>`)
        }

        radius += 15;
    }


    document.querySelector(`#${selector}`).innerHTML = createSVG(shapes, 600, 600, 0, 0, 1000, 1000);
}

//
///////////////////////////////////////////   SVG STUFF /////////////////////////////////////////
//
const circle = (x, y, r = 10, color = "white") =>
    `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${color};stroke:none"></circle>`;

const ellipse = (x, y, w, h, r = 0, color = "white") =>
    `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" style="fill:${color};stroke:none"
    transform="rotate(${r},${x},${y})"></ellipse>`;

const rect = (x, y, w, h, r = 0, color = "white") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${color};stroke:none"
    transform="rotate(${r},${x + w / 2},${y + h / 2})"></rect>`;

/** eventually when I care enough, I'll figure out a way to find the geometric center for transformation (or do something else)
 * 
 */
const poly = (points, r = 0, color = "white") =>
    `<polygon points="${points.map(p => `${p[0]},${p[1]}`).join(" ")}" 
    style="fill:${color};stroke:none"
    transform="rotate(${r},0, 0)"></polygon>`;

const line = (x1, y1, x2, y2, stroke = "black", strokeWeight = 1) =>
    `<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} style="stroke:${stroke};stroke-width:${strokeWeight}" ></line>`;

/**
 * Create a red-ish hue
 * @returns #abcdef01
 */
const getColor = () => {
    return "#" + [
        Math.floor(Math.random() * 100 + 155).toString(16).padStart(2, "0"),
        Math.floor(Math.random() * 80).toString(16).padStart(2, "0"),
        Math.floor(Math.random() * 80).toString(16).padStart(2, "0"),
        Math.floor(Math.random() * 30 + 225).toString(16).padStart(2, "0")].join("")
};


/**
 * Convert an array of shapes into an SVG
 * @param {string} shapes string array of shapes - example: [circle, rect, rect, rect]
 * @param {*} width 
 * @param {*} height 
 * @param {*} x 
 * @param {*} y 
 * @param {*} vWidth 
 * @param {*} vHeight 
 * @returns 
 */
const createSVG = (shapes, width, height, x, y, vWidth, vHeight) =>
    `<svg width="${width}" height="${height}" viewBox="${x} ${y} ${vWidth} ${vHeight}">
    ${shapes.join("")}
    </svg>`;

main();
