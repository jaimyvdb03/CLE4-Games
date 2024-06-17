import { Actor, Vector, CollisionType, CompositeCollider, Shape } from "excalibur"
import { Resources } from './resources.js'

export class Background extends Actor {

    constructor() {
        super({
            width: 1280,
            height: 720,
            anchor: Vector.Zero,
            pos: new Vector(0, 0)
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Background1.toSprite())
        let map1 = new CompositeCollider([
            Shape.Edge(new Vector(90, -200), new Vector(90, 660)),
            Shape.Edge(new Vector(90, 660), new Vector(2510, 660)),
            Shape.Edge(new Vector(2510, 660), new Vector(2510, -200)),
            Shape.Edge(new Vector(2510, -200), new Vector(2400, -200)), //entry top right
            Shape.Edge(new Vector(2400, -200), new Vector(2400, 0)), 
            Shape.Edge(new Vector(2400, 0), new Vector(1450, 0)),
            Shape.Edge(new Vector(1450, 0), new Vector(1450, -200)), 

            Shape.Edge(new Vector(1450, -200), new Vector(1250, -200)),  //entry top middle
            Shape.Edge(new Vector(1250, -200), new Vector(1250, 0)), 
            Shape.Edge(new Vector(1250, 0), new Vector(280, 0)), 
            Shape.Edge(new Vector(280, 0), new Vector(280, -200)), 
            Shape.Edge(new Vector(280, -200), new Vector(90, -200)), //entry left right
        ])
        this.body.collisionType = CollisionType.Fixed
        this.collider.set(map1)
    }
}