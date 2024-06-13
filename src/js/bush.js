import { Actor, Vector, CollisionType, } from "excalibur"

export class Bush extends Actor {

    constructor(x, y, witdth, height, image) {
        super({
            width: image.width,
            height: image.height,
            anchor: Vector.Zero,
            pos: new Vector(x, y)
        })
        this.image = image;
    }

    onInitialize(engine) {
        this.graphics.use(this.image.toSprite())
        this.body.collisionType = CollisionType.Passive;
    }
}