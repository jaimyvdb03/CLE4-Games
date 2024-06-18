import { Actor, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class ThrowingAxe extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.ThrowingAxe.width, height: Resources.ThrowingAxe.height })
        this.direction = 1
        this.shootCooldown = 300
        this.lastShotTime = 1000
    }

    onInitialize(engine) {
        const axeSprite = Resources.ThrowingAxe.toSprite()
        axeSprite.scale = new Vector(0.15, 0.15)
        this.graphics.use(axeSprite)
        this.pos.x = 30
    }

    onPreUpdate(engine) {
        this.currentTime = Date.now()
        if (engine.input.keyboard.wasPressed(Keys.Space) && (this.currentTime - this.lastShotTime >= this.shootCooldown)) {
            this.lastShotTime = this.currentTime
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