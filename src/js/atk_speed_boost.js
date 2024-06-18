import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class atk_speed_boost extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.atk_speed_frame1.width, height: Resources.atk_speed_frame1.height });
        this.name = 'atk_speed_boost';
    }

    onInitialize() {
        this.graphics.use(Resources.atk_speed_frame1.toSprite());
        this.body.collisionType = CollisionType.Passive; 
        this.scale = new Vector(1.5, 1.5);
    }
}
