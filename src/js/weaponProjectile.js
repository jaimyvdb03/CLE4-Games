import { Actor, Vector } from "excalibur"
import { Resources } from './resources'

export class WeaponProjectile extends Actor {
    constructor(x, y, sprite, scaleX, scaleY, velX, velY, angVel, direction) {
        super({x, y, width: Resources.SpellbookProjectile.width, height: Resources.SpellbookProjectile.height })
        this.sprite = sprite
        this.scaleX = scaleX
        this.scaleY = scaleY
        this.velX = velX
        this.velY = velY
        this.angVel = angVel
        this.direction = direction
    }

    onInitialize(engine) {
        const projectileSprite = this.sprite.toSprite()
        projectileSprite.scale = new Vector(this.scaleX, this.scaleY)
        this.graphics.use(projectileSprite)
        this.vel = new Vector(this.velX, this.velY)
        this.angularVelocity = this.angVel
        this.vel.x = this.vel.x * this.direction
    }
}