import { FractalPlant } from './FractalPlant.js'

const plant = new FractalPlant(500, 500);
plant.compile(5);
plant.draw("#original");