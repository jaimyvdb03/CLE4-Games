import { Actor, Vector, CollisionType, ScreenElement } from "excalibur";
import { Resources } from './resources.js';

export class Dpad_equip extends ScreenElement {
    constructor(x, y) {
        super({ x, y});
    }

    onInitialize() {
        this.graphics.use(Resources.Dpad_equip.toSprite());
        this.body.collisionType = CollisionType.Passive; 
    }
}
