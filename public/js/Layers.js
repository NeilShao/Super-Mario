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
    buffer.width = 256;
    buffer.height = 256;

    level.tiles.grid.forEach((row, x) => {
        row.forEach((tile, y) => {
            sprites.drawTile(tile.name, buffer.getContext('2d'), x, y);
        }) 
    })
    

    return function(context) {
        context.drawImage(buffer, 0, 0);
    }
}
  
export  function createSpriteLayer(entities) {
    return function(context) {
        entities.forEach(entity => {
            entity.draw(context);
        })
    }
}