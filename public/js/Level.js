import Compositor from './Compositor.js'
import Entity from './Entity.js';
import { Matrix } from './math.js'
import TileCollider from './TileCollider.js'

export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tilesCollider = new TileCollider(this.tiles);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            
            entity.update(deltaTime);
            this.tilesCollider.test(entity);
        })
    }
}