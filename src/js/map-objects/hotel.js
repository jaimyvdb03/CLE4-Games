import { Actor, Vector, CollisionType, } from "excalibur"
import { Resources } from '../resources.js'

export class Hotel extends Actor {

    constructor() {
        super({
            pos: new Vector(1490, 0),
            width: 910,
            height: 340,
            anchor: new Vector(0, 0)
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Hotel.toSprite())
        this.body.collisionType = CollisionType.Fixed
    }
}