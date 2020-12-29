import Entity from './Entity.js'
import { loadSpriteSheet } from './loaders.js'
import Jump from './traits/jump.js'
import Go from './traits/go.js'

const SLOW_DRAP = 1/1000;
const FAST_DRAP = 1/5000;


export function createMario() {
    return loadSpriteSheet('mriao')
    .then(sprites => {
        const mario = new Entity();
        mario.size.set(14, 16);
        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        mario.go.dragFactor = SLOW_DRAP;
        mario.turbo = function(turboOn) {
            this.go.dragFactor = turboOn ? FAST_DRAP : SLOW_DRAP;
        }

        mario.draw = function(context) {
            if (mario.jump.falling) {
                sprites.draw('jump', context, 0, 0, mario.go.heading < 0);
            } else if (mario.go.distance > 0) {
                if (mario.go.dir * mario.vel.x  < 0) {
                    sprites.draw('break', context, 0, 0, mario.go.heading < 0);
                } else {
                    sprites.drawAnimation('run', context, 0, 0, mario.go.distance, mario.go.heading < 0);
                }
            } else {
                sprites.draw('idle', context, 0, 0, mario.go.heading < 0);
            }
        }

        return mario
    })
}