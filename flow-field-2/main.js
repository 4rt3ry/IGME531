import { FlowField } from "./FlowField.js"
import { FlowFieldCanvas } from "./FlowFieldCanvas.js"

// const field = new FlowField(500, 500, 10, 10, 100, 50);
// field.draw("original");
const field = new FlowFieldCanvas(2000, 2000, 10, 10, 100, 50);
field.draw("canvas", "transparent");