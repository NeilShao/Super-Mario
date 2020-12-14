import KeyboardStaste from './KeyboardStaste.js'

export function setupKeyBoard(entity) {
    const input = new KeyboardStaste();
    input.addMapping('Space', keyStates => {
        if (keyStates) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
        
    });

    input.addMapping('ArrowRight', keyStates => {
        entity.go.dir = keyStates;
    });

    input.addMapping('ArrowLeft', keyStates => {
        entity.go.dir = -keyStates;
    });

    return input;
}