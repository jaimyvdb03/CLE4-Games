import { Actor, Vector, CollisionType, CompositeCollider, Shape } from "excalibur"
import { Resources } from './resources.js'

export class Background2 extends Actor {
    constructor() {
        super({
            anchor: Vector.Zero,
            pos: new Vector(0, 0)
        })
    }
    onInitialize(engine) {
        this.graphics.use(Resources.Background2.toSprite())
        let map2 = new CompositeCollider([
            Shape.Edge(new Vector(140, 1470), new Vector(30, 1470)),
            Shape.Edge(new Vector(30, 1470), new Vector(30, 1600)),
            Shape.Edge(new Vector(30, 1600), new Vector(280, 1600)),
            Shape.Edge(new Vector(280, 1600), new Vector(280, 1600)),
            Shape.Edge(new Vector(280, 1600), new Vector(280, 1540)),
            Shape.Edge(new Vector(280, 1540), new Vector(530, 1540)),   
            Shape.Edge(new Vector(530, 1540), new Vector(530, 1600)),   
            Shape.Edge(new Vector(530, 1600), new Vector(660, 1600)),
            Shape.Edge(new Vector(660, 1600), new Vector(660, 1740)),
            Shape.Edge(new Vector(660, 1740), new Vector(1920, 1740)),
            Shape.Edge(new Vector(1920, 1740), new Vector(1920, 1410)),
            Shape.Edge(new Vector(1920, 1410), new Vector(2560, 1410)),
            Shape.Edge(new Vector(2560, 1410), new Vector(2560, 1170)),
            Shape.Edge(new Vector(2560, 1170), new Vector(1640, 1170)),
            Shape.Edge(new Vector(1640, 1170), new Vector(1640, 1040)),
            Shape.Edge(new Vector(1640, 1040), new Vector(1540, 1040)),
            Shape.Edge(new Vector(1540, 1040), new Vector(1540, 90)),
            Shape.Edge(new Vector(1540, 90), new Vector(1050, 90)),
            Shape.Edge(new Vector(1050, 90), new Vector(1050, 1040)),
            Shape.Edge(new Vector(1050, 1040), new Vector(660, 1040)),
            Shape.Edge(new Vector(660, 1040), new Vector(660, 1110)),
            Shape.Edge(new Vector(660, 1110), new Vector(360, 950)),
            Shape.Edge(new Vector(360, 950), new Vector(140, 950)), 
            Shape.Edge(new Vector(140, 950), new Vector(140, 1470)),
        ])
        this.body.collisionType = CollisionType.Fixed
        this.collider.set(map2)
        console.warn = () => { };
    }
}