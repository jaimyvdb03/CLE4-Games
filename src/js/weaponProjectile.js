import { Actor, Vector } from "excalibur"
import { Resources } from './resources'
import {Cockroach} from "./cockroach.js";
import {Lich} from "./lich.js";
import {Reaper} from "./reaper.js";

export class WeaponProjectile extends Actor {
    constructor(x, y, sprite, scaleX, scaleY, velX, velY, angVel, direction, width, height) {
        super({x, y, width: width, height: height })
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

        this.on('collisionstart', (event) => this.killMonster(event, engine))
    }

    killMonster(event, engine) {
        if (event.other instanceof Cockroach) {
            event.other.kill()
            this.kill()
            engine.addPoints(20)
        }
        if (event.other instanceof Lich) {
            event.other.kill()
            this.kill()
            engine.addPoints(40)
        }
        if (event.other instanceof Reaper) {
            event.other.kill()
            this.kill()
            engine.addPoints(30)
        }
    }
}
