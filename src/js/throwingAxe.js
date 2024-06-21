import {Actor, Axes, Buttons, Keys, Vector} from "excalibur"
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
            this.shoot(engine)
        }

        let rightStickX = engine.mygamepad.getAxes(Axes.RightStickX)
        let rightStickY = engine.mygamepad.getAxes(Axes.RightStickY)
        let directionVector = new Vector(rightStickX, rightStickY).normalize();

        if (engine.mygamepad.isButtonPressed(Buttons.LeftTrigger) && (this.currentTime - this.lastShotTime >= this.shootCooldown)) {
            this.lastShotTime = this.currentTime
            this.shoot(engine, directionVector)
        }
    }

    shoot(engine, directionVector = new Vector(this.direction, 0)) {
        const projectileSpeed = this.atkSpeedBoostActive ? 900 : 450;
        const projectileXPos = this.direction === 1 ? this.parent.pos.x + 60 : this.parent.pos.x - 60;

        const velocityX = directionVector.x * projectileSpeed;
        const velocityY = directionVector.y * projectileSpeed;

        const projectile = new WeaponProjectile(
            projectileXPos,
            this.parent.pos.y,
            Resources.ThrowingAxe,
            0.15,
            0.15,
            velocityX,
            velocityY,
            20,
            this.direction,
            Resources.ThrowingAxe.width / 7,
            Resources.ThrowingAxe.height / 7
        );
        engine.currentScene.add(projectile);
    }

    setAttackSpeedBoost(active) {
        this.atkSpeedBoostActive = active;
        this.shootCooldown = active ? 350 : 700; // Half the cooldown if boost is active
    }
}