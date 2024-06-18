import { Actor, Vector, CollisionType, CompositeCollider, Shape } from "excalibur"
import { Resources } from './resources.js'
import * as ex from 'excalibur';

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
        let map1 = new ex.CompositeCollider([
            new ex.EdgeCollider(new ex.Vector(90, -200), new ex.Vector(90, 660)),
            new ex.EdgeCollider(new ex.Vector(90, 660), new ex.Vector(2510, 660)),
            new ex.EdgeCollider(new ex.Vector(2510, 660), new ex.Vector(2510, -200)),
            new ex.EdgeCollider(new ex.Vector(2510, -200), new ex.Vector(2400, -200)), //entry top right
            new ex.EdgeCollider(new ex.Vector(2400, -200), new ex.Vector(2400, 0)),
            new ex.EdgeCollider(new ex.Vector(2400, 0), new ex.Vector(1450, 0)),
            new ex.EdgeCollider(new ex.Vector(1450, 0), new ex.Vector(1450, -200)),
            new ex.EdgeCollider(new ex.Vector(1450, -200), new ex.Vector(1250, -200)),  //entry top middle
            new ex.EdgeCollider(new ex.Vector(1250, -200), new ex.Vector(1250, 0)),
            new ex.EdgeCollider(new ex.Vector(1250, 0), new ex.Vector(280, 0)),
            new ex.EdgeCollider(new ex.Vector(280, 0), new ex.Vector(280, -200)),
            new ex.EdgeCollider(new ex.Vector(280, -200), new ex.Vector(90, -200)), //entry left right
        ]);
        this.body.collisionType = ex.CollisionType.Fixed;
        this.collider.set(map1);
    }
}