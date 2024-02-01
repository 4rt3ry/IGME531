
// potentially make a palette
const color = "#423a22";


const main = () => {
    drawDesOrdres("original", 0.4);
    drawDesOrdres("variation-1", 1, 0);
    drawDesOrdres("variation-2", 0.5, 3, 3, 0, 50, "random");
}

const drawDesOrdres = (
    id,
    density = 0.2,
    randomness = 5,
    depth = 10,
    gap = -2,
    boxSize = 51.99,
    shape = "default",
    width = 1000,
    height = 1000
) => {
    const elements = [];


    for (let x = 0; x < width; x += boxSize + gap) {
        for (let y = 0; y < height; y += boxSize + gap) {
            // how many lines do we want
            const d = Math.floor(Math.random() * depth) + Math.max(Math.min(5, depth), 1);
            let currentSize = boxSize;

            let currentShape;
            for (let i = 0; i < d; i++) {
                // create 4 points of a "square" with some randomness
                let p1 = [Math.random() * randomness, Math.random() * randomness];
                let p2 = [currentSize - Math.random() * randomness, Math.random() * randomness];
                let p3 = [currentSize - Math.random() * randomness, currentSize - Math.random() * randomness];
                let p4 = [Math.random() * randomness, currentSize - Math.random() * randomness];

                // center of "square" for transformations
                const offset = (boxSize - currentSize) / 2;
                let transformation = transform();

                if (shape == "random") {
                    let rotation = Math.floor(Math.random() * 4) * 90;
                    transformation = transformation.pivot(-offset, -offset).rotate(rotation);

                    // randomize curvature
                    const commands = "LSSST";
                    let currentPath = `M ${p1[0]} ${p1[1]} `;
                    let points = [p2, p3, p4, p1];
                    for (let j = 0; j < points.length; j++) {
                        // random command
                        const c = commands.split("")[Math.floor(Math.random() * commands.length)];
                        if (c == "S") {
                            const prev = j > 0 ? points[j - 1] : p1;
                        currentPath += `S ${prev[0]} ${prev[1]}, ${points[j][0]} ${points[j][1]} `
                        }
                        else
                        currentPath += `${c} ${points[j][0]} ${points[j][1]}`;
                    }


                    // const c = "LT".split("")[Math.floor(Math.random() * 2)];
                    // const points = `M ${p1[0]} ${p1[1]} ` + [p2, p3, p4, p1].map(p => `${c} ${p[0]} ${p[1]}`).join(" ");
                    currentShape = path(currentPath, `style="fill:#32a85250;stroke:${color}"`);
                }
                else {
                    currentShape = polyLine([p1, p2, p3, p4, p1], `style="fill:none;stroke:${color}"`);
                }
                transformation = transformation.translate(x + offset, y + offset);
                elements.push(group(currentShape, transformation.transform));

                // decrease size each iteration
                currentSize -= Math.random() * currentSize * density;
            }
        }
    }
    const docElm = document.querySelector(`#${id}`);
    if (docElm)
        docElm.innerHTML = svgWrapper(elements.join(""), 600, 600, 0, 0, 1000, 1000);
}

//
///////////////////////////////////////////   SVG STUFF /////////////////////////////////////////
//

const transform = (currentTransform = "", pivot = [0, 0]) => {
    const data = {
        transform: `transform="${currentTransform}"`,
        translate: (x, y) => {
            if (isNaN(x) || isNaN(y)) return data;
            return transform(`translate(${x} ${y}) ${currentTransform}`, pivot);
        },
        pivot: (x, y) => {
            if (isNaN(x) || isNaN(y)) return data;
            return transform(currentTransform, [x, y]);
        },
        rotate: (r) => {
            if (isNaN(r)) return data;
            return transform(`rotate(${r} ${pivot[0]} ${pivot[1]}) ${currentTransform}`, pivot)
        },
        scale: (x, y) => {
            if (isNaN(x) || isNaN(y)) return data;
            return transform(`scale(${x} ${y}) ${currentTransform}`, pivot)
        },
    }
    return data;
}

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

// SVG Stuff

const circle = (x, y, r = 10, attr = "") => {
    if (!attr) attr = `style="fill:black;stroke:none"`;
    return `<circle cx="${x}" cy="${y}" r="${r}" ${attr} ></circle>`;
}

const ellipse = (x, y, w, h, attr = "") => {
    if (!attr) attr = `style="fill:black;stroke:none"`;
    return `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" ${attr}></ellipse>`;
}

const rect = (x, y, w, h, attr = "") => {
    if (!attr) attr = `style="fill:black;stroke:none"`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${attr}></rect>`;
}

const poly = (points, color = "white") =>
    `<polygon points="${points.map(p => `${p[0]},${p[1]}`).join(" ")}" 
    style="fill:${color};stroke:none"></polygon>`;

const line = (x1, y1, x2, y2, stroke = "black", strokeWeight = 1) =>
    `<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} style="stroke:${stroke};stroke-width:${strokeWeight}"></line>`;

const group = ( body = "", attr = "") => {
    return `<g ${attr}>${body}</g>`;
}

const polyLine = (points = [], attr = "") => {
    if (!attr) attr = `style="fill:none;stroke:black"`;
    return `<polyline ${attr} points="${points.map(p => `${p[0]},${p[1]}`).join(" ")}"></polyline>`;
}

const path = (data = "", attr = "") => {
    if (!attr) attr = `style="fill:none;stroke:black"`;
    return `<path ${attr} d="${data}"></path>`;
}

/**
 * Convert an array of shapes into an SVG
 * @param {string} content string array of shapes - example: [circle, rect, rect, rect]
 * @param {*} width 
 * @param {*} height 
 * @param {*} x 
 * @param {*} y 
 * @param {*} vWidth 
 * @param {*} vHeight 
 * @returns 
 */
const svgWrapper = (content, width = 100, height = 100, x = 0, y = 0, vWidth = 100, vHeight = 100) =>
    `<svg width="${width}" height="${height}" viewBox="${x} ${y} ${vWidth} ${vHeight}" xmlns="X">
    ${content}
    </svg>`;

main();
