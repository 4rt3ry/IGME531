import { HexagonTruchet } from "./HexagonTruchet.js"

const tileset = new HexagonTruchet(600, 600, 20, 1);
const tileset2 = new HexagonTruchet(600, 600, 10, 1);
const tileDemo = new HexagonTruchet(300, 300, 20, 1);

tileset.radialGrid(8, 0, 0);
tileset.draw("#original");
tileset2.radialGrid(16, 0, 0, (i) => i * 0.5, undefined, true);
tileset2.draw("#variation-1");
tileset2.radialGrid(8, 8.9, 130, (i, j) => i * 1.5 + 5, undefined);
tileset2.radialGrid(8, 130, -100, (i, j) => i * 1.5 + 1, undefined);
tileset2.radialGrid(8, -130, -90, (i, j) => i * 1.5 + 3, undefined);
tileset2.draw("#variation-2");
// tileset2.radialGrid("variation-2", 8, 0, 0, (i, j) => i *0.8, undefined);
tileDemo.tileDemo();
tileDemo.draw("#tile-demo");
