import SpriteSheet from './SpriteSheet.js'
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
