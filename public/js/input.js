import KeyboardStaste from './KeyboardStaste.js'

export function setupKeyBoard(mario) {
    const input = new KeyboardStaste();
    input.addMapping('KeyP', keyStates => {
        if (keyStates) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
        
    });

    input.addMapping('KeyO', keyStates => {
        mario.turbo(keyStates);
    });

    input.addMapping('KeyD', keyStates => {
        mario.go.dir += keyStates? 1: -1;
    });

    input.addMapping('KeyA', keyStates => {
        mario.go.dir += keyStates? -1: 1;
    });

    return input;
}