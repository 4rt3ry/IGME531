import { FractalPlant } from './FractalPlant.js'

const plant = new FractalPlant(800, 800);
plant.compile(6);
plant.draw("#original");