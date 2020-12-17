export function createBackgrounLayer(level, sprites) {
    const tiles = level.tiles;
    const resolver = level.tilesCollider.tiles;

    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 248;
    const bufferContext = buffer.getContext('2d');

    let startIndex, endIndex;
    function redraw(drawFrom, drawTo) {
        for (let x = drawFrom; x <= drawTo; ++x) {
            if (startIndex === drawFrom && endIndex === drawTo) {
                // return;
            }

            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnimationTile(tile.name, bufferContext, x - drawFrom, y, level.totalTime);
                    } else {
                        sprites.drawTile(tile.name, bufferContext, x - drawFrom, y);
                    }
                }) 
            }
        }

        startIndex = drawFrom;
        endIndex = drawTo;
    }

    return function(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);

        context.drawImage(buffer, 
            -camera.pos.x % 16, 
            -camera.pos.y);
    }
}
  
export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteContext = spriteBuffer.getContext('2d');
    
    return function(context, camera) {
        entities.forEach(entity => {
            spriteContext.clearRect(0, 0, width, height);
            entity.draw(spriteContext);
            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y
            );
        })
    }
}

export function createCollisionLayer(level) {
    const resovleTiles = [];

    const tileResolver = level.tilesCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function(x, y) {
        resovleTiles.push({x, y})
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollision(context, camera) {
        context.strokeStyle = 'blue';
        resovleTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(
                x * tileSize - camera.pos.x,
                y * tileSize - camera.pos.y,
                tileSize, tileSize);
            context.stroke();
        })

        context.strokeStyle = 'green';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x - camera.pos.x,  
                entity.pos.y - camera.pos.y, 
                entity.size.x, 
                entity.size.y);
            context.stroke();
        })

        resovleTiles.length = 0;
    }
}

export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,  
            cameraToDraw.pos.y - fromCamera.pos.y, 
            cameraToDraw.size.x, 
            cameraToDraw.size.y);
        context.stroke();
    }
}