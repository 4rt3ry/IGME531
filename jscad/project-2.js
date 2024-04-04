import { render } from './render.js';

const { booleans, colors, primitives, transforms, geometries } = jscadModeling // modeling comes from the included MODELING library
const { translate, scale } = transforms;

const { intersect, subtract, union } = booleans
const { colorize, colorNameToRgb } = colors
const { cube, cuboid, sphere, polyhedron, geodesicSphere } = primitives
const { toPoints } = geometries.geom3

const d20 = (params) => {
    return geodesicSphere({...params, frequency: 6})
}

const fractal = (params, iterations) => {
    const d20p = {radius: params.size}
    if (iterations === 0) {
        return d20({radius: params.size, frequency: 6});
    }
    console.log(toPoints(d20(d20p)))
    const next = toPoints(d20(d20p)).map(point => {
        const mag = Math.sqrt(point[0] * point[0] + point[1] * point[1] + point[2] * point[2]);
        const p = point.map(i => i * 0.5);
        debugger
        return translate([p[0], p[1], p[2]], fractal({size: params.size / 2}, iterations - 1));
    });
    return next;
}


render(document.getElementById("render"), fractal({ size: 100 }, 1));