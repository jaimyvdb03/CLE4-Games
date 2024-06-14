import { Actor, Vector, Keys, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Player extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Player.width - 5, height: Resources.Player.height });
        this.body.collisionType = CollisionType.Active; // Active collision type
        this.speedMultiplier = 1; // Default speed multiplier
        this._lifes = 4; // Initialize lifes from constructor parameter
        console.log(this._lifes)
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
    }

    handleCollision(evt) {
        if (evt.other.name === 'speedboost') {
            // Activate the speed boost
            console.log('picked up speedboost');
            evt.other.kill();
            this.speedMultiplier = 2; // Increase speed by 2 times (not 5 times as originally stated)
            this.speedBoostTimer = 10 * 1000; // 10 seconds
            this.speedBoostActive = true;
        } else if(evt.other.name === 'lifeboost') {
            console.log('picked up lifeboost');
            evt.other.kill();
            this._lifes += 1;   
            console.log(this._lifes)        
        }
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = 0;

        // Update speed boost timer
        if (this.speedBoostActive) {
            this.speedBoostTimer -= delta;
            if (this.speedBoostTimer <= 0) {
                this.speedBoostActive = false;
                this.speedMultiplier = 1; // Reset speed multiplier to normal
            }
        }

        // Player movement
        // Up
        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -350 * this.speedMultiplier;
            this.graphics.flipHorizontal = true;
        }

        // Down
        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 350 * this.speedMultiplier;
            this.graphics.flipHorizontal = true;
        }

        // Left
        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -350 * this.speedMultiplier;
            this.graphics.flipHorizontal = false;
        }

        // Right
        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 350 * this.speedMultiplier;
            this.graphics.flipHorizontal = true;
        }

        this.vel = new Vector(xspeed, yspeed);
    }
}
