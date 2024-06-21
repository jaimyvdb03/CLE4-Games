import { Actor, Vector, Keys, CollisionType, Input, Buttons, Axes } from "excalibur";
import { Resources } from './resources.js';
import { ThrowingAxe } from "./throwingAxe.js";
import { Bow } from "./bow.js";
import { Spellbook } from "./spellbook.js";
import { Staff } from "./staff.js";
import { Enemies } from "./enemies.js";
import { LichProjectile } from "./lich-projectile.js";

export class Player extends Actor {
    constructor(x, y, gamepad) {
        super({ x, y, width: Resources.Player.width / 2, height: Resources.Player.height });
        this.body.collisionType = CollisionType.Active; // Active collision type
        this._lifes = 4; // Initialize lifes from constructor parameter
        this.gamepad = gamepad; // Store the gamepad instance
        this.joystickMoved = false; // Flag to track if joystick moved

        // Speed boost variables
        this.speedMultiplier = 1;
        this.speedBoostActive = false;
        this.speedBoostDuration = 6 * 1000;
        this.speedBoostEndTime = 0;

        // Attack speed boost variables
        this.atkSpeedBoostActive = false;
        this.atkSpeedBoostDuration = 6 * 1000;
        this.atkSpeedBoostEndTime = 0;

        // Weapon switching variables
        this.weapons = [];
        this.currentWeaponIndex = 0;
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
        this.initializeWeapons();
        this.armPlayer();
    }

    handleCollision(evt) {
        // Pickup speedboost
        if (evt.other.name === 'speedboost') {
            // Activate the speed boost
            console.log('picked up speedboost');
            evt.other.kill();
            this.speedMultiplier = 2; // Increase speed by 2 times
            this.speedBoostActive = true;
            this.speedBoostEndTime = Date.now() + this.speedBoostDuration;
        }
        // Pickup atk speed boost
        else if (evt.other.name === 'atk_speed_boost') {
            console.log('picked up atk speed boost');
            evt.other.kill();
            this.atkSpeedBoostActive = true;
            this.atkSpeedBoostEndTime = Date.now() + this.atkSpeedBoostDuration;
            this.weapon.setAttackSpeedBoost(true);
        }
        // Pickup lifeboost
        else if (evt.other.name === 'lifeboost') {
            console.log('picked up lifeboost');
            evt.other.kill();
            this._lifes += 1;
            console.log(this._lifes);
        } else if (evt.other instanceof Enemies || evt.other instanceof LichProjectile) {
            this._lifes -= 1;
            console.log(`Ow no you got hit. You have`, this._lifes, 'left.')
            if (this._lifes <= 0) {
                console.log('You died :(');
                this.engine.goToScene('gameOver');
            }
        }
    }

    onPreUpdate(engine, delta) {

        // Keyboard input
        let xspeed = 0;
        let yspeed = 0;

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
            this.turnWeapon(0);
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 350 * this.speedMultiplier;
            this.graphics.flipHorizontal = true;
            this.turnWeapon(1);
        }

        this.vel = new Vector(xspeed, yspeed);

        // Gamepad movement
        if (engine.mygamepad) {
            const x = engine.mygamepad.getAxes(Axes.LeftStickX);
            const y = engine.mygamepad.getAxes(Axes.LeftStickY);
            this.vel = new Vector(x * 350 * this.speedMultiplier, y * 350 * this.speedMultiplier);

            if (this.vel.x > 0) {
                this.turnWeapon(1)
                this.graphics.flipHorizontal = true
            }
            if (this.vel.x < 0) {
                this.turnWeapon(0)
                this.graphics.flipHorizontal = false
            }

            // Shooting, jumping
            if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
                console.log('test');
            }
            if (engine.mygamepad.isButtonPressed(Buttons.RightTrigger)) {
                console.log('phew pauw');
            }

            // Switch weapons
            if (engine.mygamepad.isButtonPressed(Buttons.DpadDown)) {
                this.switchWeapon(0);
            }
            if (engine.mygamepad.isButtonPressed(Buttons.DpadUp)) {
                this.switchWeapon(1);
            }
            if (engine.mygamepad.isButtonPressed(Buttons.DpadLeft)) {
                this.switchWeapon(2);
            }
            if (engine.mygamepad.isButtonPressed(Buttons.DpadRight)) {
                this.switchWeapon(3);
            }
        }

        // Check speed boost timer
        if (this.speedBoostActive && Date.now() >= this.speedBoostEndTime) {
            console.log('Speed boost expired');
            this.speedMultiplier = 1; // Reset speed to normal
            this.speedBoostActive = false;
        }

        // Check attack speed boost timer
        if (this.atkSpeedBoostActive && Date.now() >= this.atkSpeedBoostEndTime) {
            console.log('Attack speed boost expired');
            this.weapon.setAttackSpeedBoost(false);
            this.atkSpeedBoostActive = false;
        }

        // // Boundary constraints
        // if (this.pos.x < this.width / 2) {
        //     this.pos.x = this.width / 2;
        // } else if (this.pos.x > 2560 - this.width / 2) {
        //     this.pos.x = 2560 - this.width / 2;
        // }

        // if (this.pos.y < this.height / 2) {
        //     this.pos.y = this.height / 2;
        // } else if (this.pos.y > 720 - this.height / 2) {
        //     this.pos.y = 720 - this.height / 2;
        // }
    }

    initializeWeapons() {
        this.weapons.push(new Staff());
        this.weapons.push(new Bow());
        this.weapons.push(new ThrowingAxe());
        this.weapons.push(new Spellbook());
    }

    armPlayer() {
        const weapon = this.weapons[this.currentWeaponIndex];
        this.weapon = weapon;
        this.addChild(weapon);
    }

    switchWeapon(weaponIndex) {
        if (weaponIndex >= 0 && weaponIndex < this.weapons.length) {
            this.removeChild(this.weapon);
            this.currentWeaponIndex = weaponIndex;
            this.armPlayer();
            console.log(`You equipped a ${this.weapons[weaponIndex].constructor.name}`);
        }
    }

    turnWeapon(direction) {
        if (direction == 1) {
            this.weapon.scale.x = 1;
            this.weapon.pos.x = 30;
            this.weapon.direction = 1;
        }

        if (direction == 0) {
            this.weapon.scale.x = -1;
            this.weapon.pos.x = -30;
            this.weapon.direction = -1;
        }
    }
}
