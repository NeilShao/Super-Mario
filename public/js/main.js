import { loadLevel } from './loaders.js'
import { createMario } from './Entities.js'
import Timer from './Timer.js'
import KeyboardStaste from './KeyboardStaste.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario(),
  loadLevel('1-1')
]).then(([mario, level]) => {
  const gravity = 2000;
  mario.pos.set(64, 180);
  
  level.entities.add(mario);

  const SPACE = 32
  const input = new KeyboardStaste();
  input.addMapping(32, keyStates => {
    console.log(keyStates)
    if (keyStates) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
    
  })

  input.listenTo(window);

  const timer = new Timer();
  timer.update = function(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context);
    mario.vel.y += gravity * deltaTime;
  }
  

  timer.start();
})