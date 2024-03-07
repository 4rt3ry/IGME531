import { FractalPlant } from './FractalPlant.js'
import * as svg from "./svg.js"

const plant = new FractalPlant(1500, 1500);
plant.compile(7);
// plant.draw("#original", 750, 500, (angle) => svg.transform().translate(-500, 0).rotate(angle));
plant.draw("#original", 750, 750, (angle) => svg.transform().rotate(-25).translate(-100, 0).rotate(angle));