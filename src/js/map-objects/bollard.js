import { Actor, Vector, CollisionType, } from "excalibur"

export class Bollard extends Actor {

    constructor(x, y, image) {
        super({
            pos: new Vector(x, y),
            width: image.width,
            height: image.height,
            anchor: new Vector(0.5, 1)
        })
        this.image = image;
    }

    onInitialize(engine) {
        this.graphics.use(this.image.toSprite())
        this.body.collisionType = CollisionType.Fixed
    }
}