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
    `<svg width="${width}" height="${height}" viewBox="${x} ${y} ${vWidth} ${vHeight}" xmlns="http://www.w3.org/2000/svg">
    ${content}
    </svg>`;

export { transform, circle, ellipse, rect, poly, line, group, polyLine, path, svgWrapper }