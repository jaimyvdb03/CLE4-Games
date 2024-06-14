import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Lifeboost extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Lifeboost.width, height: Resources.Lifeboost.height });
        this.name = 'lifeboost';
    }

    onInitialize() {
        this.graphics.use(Resources.Lifeboost.toSprite());
        this.body.collisionType = CollisionType.Passive; 
        this.scale = new Vector(1.5, 1.5);
    }
}
