import { loadLevel } from './loaders.js'
import { loadBackgroundSprite } from './Sprite.js'
import Compositor from './Compositor.js'
import { createBackgrounLayer, createSpriteLayer } from './Layers.js'
import { createMario } from './Entities.js'
import Timer from './Timer.js'
import KeyboardStaste from './KeyboardStaste.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario(),
  loadBackgroundSprite(),
  loadLevel('1-1')
]).then(([mario, backgroundSprites, level]) => {
  const comp = new Compositor()
  const backgroundLayer = createBackgrounLayer(level.backgrounds, backgroundSprites)
  comp.layers.push(backgroundLayer)

  const spriteLayer = createSpriteLayer(mario);
  comp.layers.push(spriteLayer);

  
  const gravity = 2000;
  mario.pos.set(64, 180);

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
    mario.update(deltaTime);
    comp.draw(context);
    mario.vel.y += gravity * deltaTime;
  }
  

  timer.start();
})