import {Actor, Axes, Buttons, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class Bow extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.Bow.width, height: Resources.Bow.height })
        this.direction = 1
        this.shootCooldown = 400
        this.lastShotTime = 1000
        this.atkSpeedBoostActive = false;
    }

    onInitialize(engine) {
        const bowSprite = Resources.Bow.toSprite()
        bowSprite.scale = new Vector(0.13, 0.13)
        this.graphics.use(bowSprite)
    }

    onPreUpdate(engine) {
        this.currentTime = Date.now()

        // Adjust position based on player's direction
        if (this.direction === 1) {
            this.pos = new Vector(35, 10);
        } else {
            this.pos = new Vector(-35, 10);
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
        const projectileSpeed = this.atkSpeedBoostActive ? 1500 : 800;
        const projectileXPos = this.direction === 1 ? this.parent.pos.x + 70 : this.parent.pos.x - 70;

        const velocityX = directionVector.x * projectileSpeed;
        const velocityY = directionVector.y * projectileSpeed;

        const projectile = new WeaponProjectile(
            projectileXPos,
            this.parent.pos.y + 10,
            Resources.Arrow,
            0.15,
            0.15,
            velocityX,
            velocityY,
            0,
            this.direction,
            Resources.Arrow.width / 15,
            Resources.Arrow.height / 85
        );
        engine.currentScene.add(projectile);
    }

    setAttackSpeedBoost(active) {
        this.atkSpeedBoostActive = active;
        this.shootCooldown = active ? 220 : 400; // Half the cooldown if boost is active
    }
}