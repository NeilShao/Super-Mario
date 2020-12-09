import Entity from './Entity.js'
import { loadMarioSprite } from './Sprite.js'
import Velocity from './traits/velocity.js'
import Jump from './traits/jump.js'

export function createMario() {
    return loadMarioSprite()
    .then(sprites => {
        const mario = new Entity();
        mario.addTrait(new Velocity());    
        mario.addTrait(new Jump());    
        mario.draw = function(context) {
            sprites.draw('mario', context, this.pos.x, this.pos.y);
        }

        return mario
    })
}