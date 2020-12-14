function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          sprites.drawTile(background.tile, context, x, y);
        }
      }
    })
  }

export function createBackgrounLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 512;
    buffer.height = 512;

    level.tiles.grid.forEach((row, x) => {
        row.forEach((tile, y) => {
            sprites.drawTile(tile.name, buffer.getContext('2d'), x, y);
        }) 
    })
    
    return function(context) {
        context.drawImage(buffer, 0, 0);
    }
}
  
export function createSpriteLayer(entities) {
    return function(context) {
        entities.forEach(entity => {
            entity.draw(context);
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

    return function drawCollision(context) {
        context.strokeStyle = 'blue';
        resovleTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(
                x * tileSize,
                y * tileSize,
                tileSize, tileSize);
            context.stroke();
        })

        context.strokeStyle = 'green';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x,  entity.pos.y, 
                entity.size.x, entity.size.y);
            context.stroke();
        })

        resovleTiles.length = 0;
    }
}