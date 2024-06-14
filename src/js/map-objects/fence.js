import { Actor, Vector, CollisionType, } from "excalibur"
import { Resources } from '../resources.js'

export class Fence extends Actor {

    constructor() {
        super({
            pos: new Vector(1220, 0),
            width: 20,
            height: 380,
            anchor: new Vector(0, 0)
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fence.toSprite())
        this.body.collisionType = CollisionType.Fixed
    }
}