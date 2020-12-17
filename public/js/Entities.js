import Entity from './Entity.js'
import { loadSpriteSheet } from './loaders.js'
import Jump from './traits/jump.js'
import Go from './traits/go.js'

export function createMario() {
    return loadSpriteSheet('mriao')
    .then(sprites => {
        const mario = new Entity();
        mario.size.set(14, 16);
        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        



        mario.draw = function(context) {
            if (mario.go.dir !== 0) {
                sprites.drawAnimation('run', context, 0, 0, mario.go.distance, mario.go.heading < 0);
            } else {
                sprites.draw('idle', context, 0, 0);
            }
        }

        return mario
    })
}