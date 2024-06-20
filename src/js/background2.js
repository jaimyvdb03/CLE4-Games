import { Actor, Vector, CollisionType, CompositeCollider, Shape } from "excalibur"
import { Resources } from './resources.js'

export class Background2 extends Actor {
    constructor() {
        super({
            width: 1280,
            height: 720,
            anchor: Vector.Zero,
            pos: new Vector(0, 0)
        })
    }
    onInitialize(engine) {
        this.graphics.use(Resources.Background2.toSprite())
    }

}