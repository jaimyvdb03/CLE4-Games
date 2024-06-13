import { Actor, Engine, Vector, CollisionType, Timer } from "excalibur";
import { Resources } from './resources.js';
import { Enemies } from "./enemies.js";

export class Reaper extends Enemies {
    constructor() {
        super({
            width: Resources.ReaperLeft.width,
            height: Resources.ReaperLeft.height
        });
        this.body.collisionType = CollisionType.Active; // Active collision type
        this.vel = new Vector(0, 0);
        this.timeSinceLastChange = 0;
        this.isFacingRight = true;
        this.speed = 50; // Set the fixed speed
    }

    onInitialize(engine) {
        console.log("intializing")
        this.pos.x = 500;
        this.pos.y = 500;
        this.engine = engine;  // Store the engine instance
        this.graphics.use(Resources.ReaperRight.toSprite());
        this.setRandomDirection();

        this.timer = new Timer({
            interval: 500,
            repeats: true,
            fcn: () => this.toggleSprite()
        });
        engine.add(this.timer);

        this.timer.start();
    }

    toggleSprite() {
        this.isRoach1 = !this.isRoach1;

        if (this.isFacingRight) {
            this.graphics.use(Resources.ReaperRight.toSprite());
        } else {
            this.graphics.use(Resources.ReaperLeft.toSprite());
        }
    }

    setRandomDirection() {
        const angle = Math.random() * Math.PI * 2;
        this.vel = new Vector(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed);
        // Check the direction and update the facing direction
        this.isFacingRight = this.vel.x >= 0;
    }

    update(engine, delta) {
        super.update(engine, delta);
        this.timeSinceLastChange += delta;
        if (this.timeSinceLastChange >= 2000) {
            this.setRandomDirection();
            this.timeSinceLastChange = 0;
        }
        this.pos = this.pos.add(this.vel.scale(delta / 1000));
    }
}
