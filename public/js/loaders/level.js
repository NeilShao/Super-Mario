import Level from '../Level.js'
import { createBackgrounLayer, createSpriteLayer} from '../Layers.js'
import { loadJSON, loadSpriteSheet } from '../loaders.js'
import { Matrix } from '../math.js'

function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, tile);
    }

    return grid;
}

function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, tile);
    }

    return grid;
}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) { 
            yield {x, y};
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(background, xStart, xLen, yStart, 1);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(background, xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        for (const item of expandRange(range)) {
            yield item;
        }
    }
}

function* expandTiles(tiles, patterns) {
    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const {x, y} of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;

                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    yield* walkTiles(tiles, derivedX, derivedY);
                } else {
                    yield {
                        tile: { name: tile.style },
                        x: derivedX,
                        y: derivedY,
                    };
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0);
}


export function loadLevel(name) {
    return loadJSON(`levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet)
    ]))
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        const collisionGrid = createCollisionGrid(levelSpec.layers[0].tiles, levelSpec.patterns);
        
        level.setCollisionGrid(collisionGrid);

        debugger

        const backgroundGrid = createBackgroundGrid(levelSpec.layers[0].tiles, levelSpec.patterns);
        const backgroundLayer = createBackgrounLayer(level, backgroundGrid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    })
}