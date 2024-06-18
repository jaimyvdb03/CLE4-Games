import { Actor, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class Bow extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.Bow.width, height: Resources.Bow.height })
        this.direction = 1
        this.shootCooldown = 300
        this.lastShotTime = 1000
    }

    onInitialize(engine) {
        const bowSprite = Resources.Bow.toSprite()
        bowSprite.scale = new Vector(0.2, 0.2)
        this.graphics.use(bowSprite)
        this.pos.x = 20
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
                // X pos, Y pos, Image, X scale, Y scale, X vel, Y vel, Angular vel
                this.parent.pos.x, this.parent.pos.y, Resources.Arrow, this.scaleX, 0.15, 800, 0, 0, this.direction,
                Resources.Arrow.width / 15, Resources.Arrow.height /15)
            engine.add(projectile)
        }
    }
}