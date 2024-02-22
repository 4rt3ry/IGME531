import { HexagonTruchet } from "./HexagonTruchet.js"

const tileset = new HexagonTruchet(600, 600, 20, 1);
const tileset2 = new HexagonTruchet(600, 600, 10 , 1);
const tileDemo = new HexagonTruchet(300, 300, 20, 1);

tileset.radialGrid("original", 8);
tileset2.radialGrid("variation-1", 16, (i) => i * 0.5, undefined, true);
tileDemo.tileDemo("tile-demo");