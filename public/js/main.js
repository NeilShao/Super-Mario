import { loadLevel } from './loaders.js'
import { createMario } from './Entities.js'
import { createCollisionLayer } from './Layers.js'
import Timer from './Timer.js'
import { setupKeyBoard } from './input.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {
    mario.pos.set(0, 0);
    
    level.entities.add(mario);

    const input = setupKeyBoard(mario);
    input.listenTo(window);

    const timer = new Timer();
    timer.update = function(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);
    }
    timer.start();
})