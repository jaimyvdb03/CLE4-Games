import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Speedboost extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Speedboost.width, height: Resources.Speedboost.height });
        this.name = 'speedboost';
    }

    onInitialize() {
        this.graphics.use(Resources.Speedboost.toSprite());
        this.body.collisionType = CollisionType.Passive; 
        this.scale = new Vector(1.5, 1.5);
    }
}
