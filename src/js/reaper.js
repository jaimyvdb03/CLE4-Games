import { Actor, CollisionType, Vector, Timer } from "excalibur";
import { Resources } from './resources.js';

export class Reaper extends Actor {
    constructor(player) {
        super({
            width: Resources.ReaperRight.width,
            height: Resources.ReaperRight.height
        });

        this.player = player;
        this.body.collisionType = CollisionType.Active; // Active collision type
        this.vel = new Vector(0, 0);
        this.isFacingRight = true;
        this.speed = 50; // Set the fixed speed
        this.timeSinceLastChange = 0;
    }

    onInitialize(engine) {
        this.engine = engine;  // Store the engine instance
        this.pos.x = 500;
        this.pos.y = 500;
        this.graphics.use(Resources.ReaperRight.toSprite());

        this.timer = new Timer({
            interval: 500,
            repeats: true,
            fcn: () => this.toggleSprite()
        });
        engine.add(this.timer);
        this.timer.start();
    }

    toggleSprite() {
        if (this.isFacingRight) {
            this.graphics.use(Resources.ReaperRight.toSprite());
        } else {
            this.graphics.use(Resources.ReaperLeft.toSprite());
        }
    }

    update(engine, delta) {
        super.update(engine, delta);

        // Calculate direction towards the player
        const directionToPlayer = this.player.pos.sub(this.pos).normalize();

        // Set velocity towards player
        this.vel = directionToPlayer.scale(this.speed);

        // Update position based on velocity
        this.pos = this.pos.add(this.vel.scale(delta / 1000));

        // Update facing direction based on velocity
        this.isFacingRight = this.vel.x >= 0;

        // Toggle sprite
    }
}
