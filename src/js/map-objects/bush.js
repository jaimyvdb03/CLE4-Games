import { Actor, Vector, CollisionType, } from "excalibur"

export class Bush extends Actor {

    constructor(x, y, width, height, image, anchor) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            anchor: anchor
        })
        this.image = image;
    }

    onInitialize(engine) {
        this.graphics.use(this.image.toSprite())
        this.body.collisionType = CollisionType.Fixed
    }
}