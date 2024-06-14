import { Actor, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class ThrowingAxe extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.ThrowingAxe.width, height: Resources.ThrowingAxe.height })
    }

    onInitialize(engine) {
        const axeSprite = Resources.ThrowingAxe.toSprite()
        axeSprite.scale = new Vector(0.2, 0.2)
        this.graphics.use(axeSprite)
        this.pos.x = 30
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            const projectile = new WeaponProjectile(
                // X pos, Y pos, Image, X scale, Y scale, X vel, Y vel, Angular vel
                this.parent.pos.x, this.parent.pos.y, Resources.ThrowingAxe, 0.15, 0.15, 500, 0, 20)
            engine.add(projectile)
        }
    }   
}