import Compositor from './Compositor.js'
import Entity from './Entity.js';
import { Matrix } from './math.js'
import TileCollider from './TileCollider.js'

export default class Level {
    constructor() {
        this.gravity = 2000;
        

        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tilesCollider = new TileCollider(this.tiles);

        this.totalTime = 0;
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tilesCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tilesCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        })

        this.totalTime += deltaTime;
    }
}