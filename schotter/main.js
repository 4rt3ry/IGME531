
// potentially make a palette
// const color = "#423a22";


const main = () => {
    drawSchotter("original");
    drawSchotter("variation-1", "radial", 600, 600);
    drawSchotter("variation-2", "radial-inverse", 600, 600, 23);
}

const drawSchotter = (id, chaosDirection = "vertical", width = 400, height = 600, boxSize = 25, gap = 0) => {
    const offset = boxSize / 2;

    const shapes = [];
    let color = "black";
    for (let y = 0; y < height - boxSize; y += boxSize + gap) {
        for (let x = boxSize; x < width - boxSize; x += boxSize + gap) {

            // strength determines the amount of "chaos"
            let strength;
            switch (chaosDirection) {
                case "horizontal": strength = x / width; break;
                case "radial":
                    strength = Math.sqrt(
                        Math.pow(x - width / 2, 2) +
                        Math.pow(y - height / 2, 2)) / (height + width) * 4;
                    if (strength >= 1) continue;
                    color = `rgb(${255 * strength},0,0)`;
                    break;
                case "radial-inverse":
                    strength = 1 - Math.sqrt(
                        Math.pow(x - width / 2, 2) +
                        Math.pow(y - height / 2, 2)) / (height + width) * 4;
                    if (strength <= 0) continue;
                    color = `rgb(${255 * strength},0,0)`;
                    break;
                case "vertical":
                default: strength = y / height; break;
            }

            const rotation = (Math.random() * 180 - 90) * strength;
            const randomOffset = (Math.random() * boxSize - offset) * strength;
            let t = transform().pivot(offset, offset).rotate(rotation).translate(x, y);
            t = t.translate(randomOffset, 0);
            shapes.push(group(rect(0, 0, boxSize, boxSize, `style=fill:none;stroke:${color}`), t.transform));
        }
    }
    const docElm = document.querySelector(`#${id}`);
    if (docElm)
        docElm.innerHTML = svgWrapper(shapes.join(""), width, height, 0, 0, width, height);
}

//
///////////////////////////////////////////   SVG STUFF /////////////////////////////////////////
//

const transform = (currentTransform = "", pivot = [0, 0]) => {
    const data = {
        transform: `transform="${currentTransform}"`,
        __pivot: pivot,
        translate: (x, y) => {
            if (isNaN(x) || isNaN(y)) return data;
            return transform(`translate(${x} ${y}) ${currentTransform}`, pivot);
        },
        pivot: (x, y) => {
            if (isNaN(x) || isNaN(y)) return data;
            data.__pivot[0] = x;
            data.__pivot[1] = y;
            return data;
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

const poly = (points, attr = "") => {
    if (!attr) attr = `style="fill:black;stroke:none"`;

    return `<polygon points="${points.map(p => `${p[0]},${p[1]}`).join(" ")}" 
    ${attr}></polygon>`;
}

const line = (x1, y1, x2, y2, stroke = "black", strokeWeight = 1) =>
    `<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} style="stroke:${stroke};stroke-width:${strokeWeight}"></line>`;

const group = (body = "", attr = "") => {
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
