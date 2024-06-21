import {Actor, Axes, Buttons, Keys, Vector} from "excalibur"
import { Resources } from './resources';
import { WeaponProjectile } from "./weaponProjectile";

export class Staff extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Staff.width, height: Resources.Staff.height });
        this.direction = 1;
        this.shootCooldown = 550;
        this.lastShotTime = 1000;
        this.atkSpeedBoostActive = false;
    }

    onInitialize(engine) {
        const staffSprite = Resources.Staff.toSprite();
        staffSprite.scale = new Vector(0.13, 0.13);
        this.graphics.use(staffSprite);
    }

    onPreUpdate(engine) {
        this.currentTime = Date.now();

        // Adjust position based on player's direction
        if (this.direction === 1) {
            this.pos = new Vector(50, -8);
        } else {
            this.pos = new Vector(-50, -8);
        }

        if (engine.input.keyboard.wasPressed(Keys.Space) && (this.currentTime - this.lastShotTime >= this.shootCooldown)) {
            this.lastShotTime = this.currentTime;
            this.shoot(engine);
        }

        if (engine.mygamepad) {
            let rightStickX = engine.mygamepad.getAxes(Axes.RightStickX);
            let rightStickY = engine.mygamepad.getAxes(Axes.RightStickY);
            let directionVector = new Vector(rightStickX, rightStickY).normalize();
            if (engine.mygamepad.isButtonPressed(Buttons.LeftTrigger) && (this.currentTime - this.lastShotTime >= this.shootCooldown)) {
                this.lastShotTime = this.currentTime;
                this.shoot(engine, directionVector);
            }
        }
    }


    shoot(engine, directionVector = new Vector(this.direction, 0)) {
        const projectileSpeed = this.atkSpeedBoostActive ? 1300 : 650;
        const projectileXPos = this.direction === 1 ? this.parent.pos.x + 110 : this.parent.pos.x - 110;

        const velocityX = directionVector.x * projectileSpeed;
        const velocityY = directionVector.y * projectileSpeed;

        const projectile = new WeaponProjectile(
            projectileXPos,
            this.parent.pos.y - 25,
            Resources.StaffProjectile,
            0.1,
            0.1,
            velocityX,
            velocityY,
            200,
            this.direction,
            Resources.ThrowingAxe.width / 15,
            Resources.ThrowingAxe.height / 15
        );
        engine.currentScene.add(projectile);
    }

    setAttackSpeedBoost(active) {
        this.atkSpeedBoostActive = active;
        this.shootCooldown = active ? 275 : 550; // Half the cooldown if boost is active
    }
}
