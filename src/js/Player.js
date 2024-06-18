import { Actor, Vector, Keys, CollisionType, Input } from "excalibur";
import { Resources } from './resources.js';
import { ThrowingAxe } from "./throwingAxe.js";
import { Bow } from "./bow.js";
import { Spellbook } from "./spellbook.js";
import { Staff } from "./staff.js";
import { Enemies } from "./enemies.js";
import { LichProjectile } from "./lich-projectile.js";

export class Player extends Actor {
    constructor(x, y, gamepad) {
        super({ x, y, width: Resources.Player.width - 5, height: Resources.Player.height });
        this.body.collisionType = CollisionType.Active; // Active collision type
        this.speedMultiplier = 1; // Default speed multiplier
        this._lifes = 4; // Initialize lifes from constructor parameter
        this.gamepad = gamepad; // Store the gamepad instance
        this.joystickMoved = false; // Flag to track if joystick moved
        console.log(this._lifes);
    }

    // Getter for lifes
    get lifes() {
        return this._lifes;
    }

    onInitialize(engine) {
        this.engine = engine;  // Store the engine instance
        this.body.useGravity = true;
        this.graphics.use(Resources.Player.toSprite());
        this.on('collisionstart', this.handleCollision.bind(this));
        this.vel = new Vector(0, 0);
        this.armPlayer()
        this.pos = new Vector(1350, 500);
    }

    handleCollision(evt) {
         // Pickup speedboost
         if (evt.other.name === 'speedboost') {
            // Activate the speed boost
            console.log('picked up speedboost');
            evt.other.kill();
            this.speedMultiplier = 2; // Increase speed by 2 times (not 5 times as originally stated)
            this.speedBoostTimer = 10 * 1000; // 10 seconds
            this.speedBoostActive = true;
        }
        // Pickup lifeboost
        else if  (evt.other.name === 'lifeboost') {
            console.log('picked up lifeboost');
            evt.other.kill();
            this._lifes += 1;
            console.log(this._lifes);
        } else if (evt.other instanceof Enemies || evt.other instanceof LichProjectile) {
            this._lifes -= 1;
            console.log(`Ow no you got hit. You have`, this._lifes, 'left.')

        } else if (evt.other.name === 'lifeboost') {
            console.log('picked up lifeboost');
            evt.other.kill();
            this._lifes += 1;
            console.log(this._lifes)
        } else if (evt.other instanceof Enemies || evt.other instanceof LichProjectile) {
            this._lifes -= 1;

        }
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = 0;

        // Keyboard input
        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -350 * this.speedMultiplier;
            this.graphics.flipHorizontal = true;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 350 * this.speedMultiplier;
            this.graphics.flipHorizontal = true;
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -350 * this.speedMultiplier;
            this.graphics.flipHorizontal = false;
            this.turnWeapon(0)
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 350 * this.speedMultiplier;
            this.graphics.flipHorizontal = true;
            this.turnWeapon(1)

        }

        // Gamepad input
        if (this.gamepad) {
            const leftStickX = this.gamepad.axes[0]; // X-axis of left stick
            const leftStickY = this.gamepad.axes[1]; // Y-axis of left stick

            // Apply a deadzone to prevent drift when the stick is near the center
            const deadzone = 0.1;
            if (Math.abs(leftStickX) > deadzone || Math.abs(leftStickY) > deadzone) {
                this.joystickMoved = true; // Joystick moved flag
            } else {
                this.joystickMoved = false; // Joystick back to center
            }

            // Calculate speed based on joystick position
            xspeed = leftStickX * 350 * this.speedMultiplier;
            yspeed = leftStickY * 350 * this.speedMultiplier;

            // Flip graphics based on movement direction
            if (xspeed !== 0) {
                this.graphics.flipHorizontal = xspeed > 0;
            }
        }

        // Set velocity based on computed speeds
        this.vel = new Vector(xspeed, yspeed);

        // Update player direction only if joystick has moved
        if (this.joystickMoved) {
            this.turnWeapon(xspeed);
        }
    }

    armPlayer() {
        const weapon = new Bow( )
        this.weapon = weapon
        this.addChild(weapon)
    }

    turnWeapon(direction, ) {
        if (direction == 1) {
            this.weapon.scale.x = 1
            this.weapon.pos.x = 30
            this.weapon.direction = 1
        }
      
        if (direction == 0) {
            this.weapon.scale.x = -1
            this.weapon.pos.x = -30
            this.weapon.direction = -1
        }
    }
}
