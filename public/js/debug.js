export function setupMouseControl(canvas, entity, camera) {
    let lastEvent;
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y,
                );
            } else if (event.buttons === 2 &&
                event.type === 'mousemove'
                ) {
                camera.pos.x -= event.movementX;
                // camera.pos.y -= event.movementy;
            }

            lastEvent = event;
        })
    })

    canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    })
}