import { Actor, Vector, CollisionType, } from "excalibur"
import { Resources } from '../resources.js'

export class Playground extends Actor {

    constructor() {
        super({
            pos: new Vector(950, 240),
            width: 40,
            height: 60,
            anchor: new Vector(0.5, 0.5)
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Playground.toSprite())
        this.body.collisionType = CollisionType.Fixed
    }
}