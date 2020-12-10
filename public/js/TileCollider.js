class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            return {
                tile,
            }
        } 
    }

    matchByPostion(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY),
        )
    }
}


export default class TileCollider {
    constructor(tilesMatrix) {
        this.tiles = new TileResolver(tilesMatrix);
    }

    test(entity) {
        const match = this.tiles.matchByPostion(entity.pos.x, entity.pos.y);
        if (match) {
            console.table('Test', match);
        }
    }
}