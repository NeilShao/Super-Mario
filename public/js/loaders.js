import Level from './Level.js'
import SpriteSheet from './SpriteSheet.js'
import { createBackgrounLayer, createSpriteLayer} from './Layers.js'
import { createAnimation } from './animation.js' 

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    })
}

export function loadJSON(url) {
    return fetch(url).then(r => r.json())
}

function createTiles(level, backgrounds) {
    function applyBackground(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; ++x) {
            for (let y = yStart; y < yEnd; ++y) {
                level.tiles.set(x, y, {
                    name: background.style,
                    behavior: background.behavior
                })
            }
        }
    }

    backgrounds.forEach(background => {
        background.ranges.forEach((range) => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyBackground(background, xStart, xLen, yStart, yLen);
            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyBackground(background, xStart, xLen, yStart, 1);
            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyBackground(background, xStart, 1, yStart, 1);
            }
        })
    })
}

export function loadLevel(name) {
    return loadJSON(`levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet)
    ]))
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        createTiles(level, levelSpec.backgrounds);

        const backgroundLayer = createBackgrounLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    })
}



export function loadSpriteSheet(name) {
    return loadJSON(`/sprites/${name}.json`)
    .then(spriteSpec => Promise.all([
        spriteSpec,
        loadImage(spriteSpec.imageURL)
    ]))
    .then(([spriteSpec, image]) => {
        const sprites = new SpriteSheet(
            image, 
            spriteSpec.tileW, 
            spriteSpec.tileH);
        
        if (spriteSpec.tiles) {
            spriteSpec.tiles.forEach(tileSpec => {
                sprites.defineTile(
                    tileSpec.name, 
                    tileSpec.index[0], 
                    tileSpec.index[1]);
            })
        }

        if (spriteSpec.frames) {
            spriteSpec.frames.forEach(framesSpec => {
                sprites.define(
                    framesSpec.name, 
                    ...framesSpec.rect);
            })
        }

        if (spriteSpec.animations) {
            spriteSpec.animations.forEach(animtionSpec => {
                const animation = createAnimation(
                    animtionSpec.frames,
                    animtionSpec.frameLen,
                );

                sprites.defineAnimation(animtionSpec.name, animation);
            })
        }

        console.log(sprites)
        
        return sprites;
    });
}