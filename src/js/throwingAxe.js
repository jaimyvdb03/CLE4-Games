import { Actor, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class ThrowingAxe extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.ThrowingAxe.width, height: Resources.ThrowingAxe.height })
        this.direction = 1
    }

    onInitialize(engine) {
        const axeSprite = Resources.ThrowingAxe.toSprite()
        axeSprite.scale = new Vector(0.2, 0.2)
        this.graphics.use(axeSprite)
        this.pos.x = 30
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            if (this.direction === 1) {
                this.scaleX = 0.15
            } else {
                this.scaleX = -0.15
            }
            const projectile = new WeaponProjectile(
                // X pos, Y pos, Image, X scale, Y scale, X vel, Y vel, Angular vel, Direction, Width, Height
                this.parent.pos.x, this.parent.pos.y, Resources.ThrowingAxe, 0.15, 0.15, 500, 0, 20, this.direction,
                Resources.ThrowingAxe.width / 15, Resources.ThrowingAxe.height /15)
            engine.add(projectile)
        }
    }
}