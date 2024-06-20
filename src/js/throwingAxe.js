import { Actor, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class ThrowingAxe extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.ThrowingAxe.width, height: Resources.ThrowingAxe.height })
        this.direction = 1
        this.shootCooldown = 700
        this.lastShotTime = 1000
        this.atkSpeedBoostActive = false;
    }

    onInitialize(engine) {
        const axeSprite = Resources.ThrowingAxe.toSprite()
        axeSprite.scale = new Vector(0.13, 0.13)
        this.graphics.use(axeSprite)
    }

    onPreUpdate(engine) {
        this.currentTime = Date.now()

    // Adjust position based on player's direction
    if (this.direction === 1) {
        this.pos = new Vector(50, -10);
    } else {
        this.pos = new Vector(-50, -10);
    }

        if (engine.input.keyboard.wasPressed(Keys.Space) && (this.currentTime - this.lastShotTime >= this.shootCooldown)) {
            this.lastShotTime = this.currentTime
            if (this.direction === 1) {
                this.scaleX = 0.15
            } else {
                this.scaleX = -0.15
            }

            const projectileXPos = this.direction === 1 ? this.parent.pos.x + 60 : this.parent.pos.x - 60;
            const projectileSpeed = this.atkSpeedBoostActive ? 900 : 450;

            const projectile = new WeaponProjectile(
                // X pos, Y pos, Image, X scale, Y scale, X vel, Y vel, Angular vel, Direction, Width, Height
                projectileXPos, this.parent.pos.y, Resources.ThrowingAxe, 0.15, 0.15, projectileSpeed, 0, 20, this.direction,
                Resources.ThrowingAxe.width / 7, Resources.ThrowingAxe.height / 7)
            engine.add(projectile)
        }
    }

    setAttackSpeedBoost(active) {
        this.atkSpeedBoostActive = active;
        this.shootCooldown = active ? 350 : 700; // Half the cooldown if boost is active
    }
}