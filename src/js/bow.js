import { Actor, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class Bow extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.Bow.width, height: Resources.Bow.height })
    }

    onInitialize(engine) {
        const bowSprite = Resources.Bow.toSprite()
        bowSprite.scale = new Vector(0.2, 0.2)
        this.graphics.use(bowSprite)
        this.pos.x = 20
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            const projectile = new WeaponProjectile(
                // X pos, Y pos, Image, X scale, Y scale, X vel, Y vel, Angular vel
                this.parent.pos.x, this.parent.pos.y, Resources.Arrow, 0.15, 0.15, 800, 0, 0)
            engine.add(projectile)
        }
    }   
}