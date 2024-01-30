
const main = () => {
    // DrawOriginal("original");
}

const DrawOriginal = (id) => {
    const width = 600;
    const height = 600;
    const boxSize = 50;
    const gap = 0;
    const randomness = 5;

    const elements = [];


    for (let x = 0; x < width; x += boxSize + gap) {
        for (let y = 0; y < height; y += boxSize + gap) {
            const depth = Math.floor(Math.random() * 20) + 10;
            let currentSize = boxSize;
            for (let i = 0; i < depth; i++) {
                // decrease size each iteration
                let p1 = [Math.random() * randomness, Math.random() * randomness];
                let p2 = [currentSize - Math.random() * randomness, Math.random() * randomness];
                let p3 = [currentSize - Math.random() * randomness, currentSize - Math.random() * randomness];
                let p4 = [Math.random() * randomness, currentSize - Math.random() * randomness];

                elements.push(group(transform().translate(x, y).transform, polyLine("", [p1, p2, p3, p4])))

                currentSize -= Math.max(Math.random * currentSize, randomness);
            }
        }
    }

    document.querySelector(`#${id}`).innerHTML = createSVG(elements, 600, 600, 0, 0, 1000, 1000);
}

//
///////////////////////////////////////////   SVG STUFF /////////////////////////////////////////
//

class Transform {
    constructor() {

    }


}

// const transform = (theTransform, pivot) => {
//     const data = {
//         transform: theTransform, pivot, 
//         translate: (x, y) => {
//             // if (isNaN(x) || isNaN(y)) return data;
//             // data.__transform += `transform(${x} ${y}) `
//             // debugger
//             // return data.__transform;
//             return transform(theTransform + `transform(${x} ${y}) `, pivot);
//         },
//         setPivot: (x, y) => {
//             // if (isNaN(x) || isNaN(y)) return data;
//             data.__pivot[0] = x;
//             data.__pivot[1] = y;
//             return data;

//             return transform(theTransform, [x, y])
//         },
//         rotate: (r) => {
//             // if (isNaN(r)) return data;
//             data.__transform += `rotate(${r} ${__pivot[0]} ${__pivot[0]}) `
//             return data;
//         },
//         scale: (x, y) => {
//             // if (isNaN(x) || isNaN(y)) return data;
//             data.__transform += `scale(${x} ${y}) `
//             return data;
//         },
//     }
//     return data;
// }

// const transform = () => {
//     const data = {
//         __transform: "",
//         __pivot: [0, 0],
//         translate: (x, y) => {
//             // if (isNaN(x) || isNaN(y)) return data;
//             data.__transform += `transform(${x} ${y}) `
//             debugger
//             return data.__transform;
//         },
//         setPivot: (x, y) => {
//             // if (isNaN(x) || isNaN(y)) return data;
//             data.__pivot[0] = x;
//             data.__pivot[1] = y;
//             return data;
//         },
//         rotate: (r) => {
//             // if (isNaN(r)) return data;
//             data.__transform += `rotate(${r} ${__pivot[0]} ${__pivot[0]}) `
//             return data;
//         },
//         scale: (x, y) => {
//             // if (isNaN(x) || isNaN(y)) return data;
//             data.__transform += `scale(${x} ${y}) `
//             return data;
//         },
//     }
//     return data;

//     // return {
//     //     __pivot: [0, 0],
//     //     translate: (x, y) => {
//     //         // if (isNaN(x) || isNaN(y)) return this;
//     //         this.__transform += `transform(${x} ${y}) `
//     //         debugger
//     //         return this.__transform;
//     //     },
//     //     setPivot: (x, y) => {
//     //         // if (isNaN(x) || isNaN(y)) return this;
//     //         this.__pivot[0] = x;
//     //         this.__pivot[1] = y;
//     //         return this;
//     //     },
//     //     rotate: (r) => {
//     //         // if (isNaN(r)) return this;
//     //         this.__transform += `rotate(${r} ${__pivot[0]} ${__pivot[0]}) `
//     //         return this;
//     //     },
//     //     scale: (x, y) => {
//     //         // if (isNaN(x) || isNaN(y)) return this;
//     //         this.__transform += `scale(${x} ${y}) `
//     //         return this;
//     //     },
//     // }
// }

const group = (attr = "", body = "") => {
    return `<g ${attr}>${body}</g>`;
}

const polyLine = (attr = "", points = []) => {
    return `<polyline ${attr} points="${points.map(p => `${p[0]},${p[1]}`).join(" ")}" />`;
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
