import Camera from './Camera.js'
import Timer from './Timer.js'
import { loadLevel } from './loaders.js'
import { createMario } from './Entities.js'
import { setupKeyBoard } from './input.js'
import { setupMouseControl } from './debug.js' 
import { createCollisionLayer, createCameraLayer } from './Layers.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {
    mario.pos.set(0, 0);

    const camera = new Camera(); 
    window.camera = camera;
    
    setupMouseControl(canvas, mario, camera);

    level.entities.add(mario);

    // level.comp.layers.push(
    //     createCollisionLayer(level),
    //     createCameraLayer(camera)
    // );


    const input = setupKeyBoard(mario);
    input.listenTo(window);

    const timer = new Timer();
    timer.update = function(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context, camera);
    }
    timer.start();
})