import { Actor, Engine, Vector, CollisionType, Timer } from "excalibur";
import { Resources } from './resources.js';
import { Enemies } from "./enemies.js";

export class Cockroach extends Enemies {
    constructor() {
        super({
            width: Resources.CockroachRight1.width,
            height: Resources.CockroachRight1.height
        });
        this.body.collisionType = CollisionType.Active; // Active collision type
        this.vel = new Vector(0, 0);
        this.timeSinceLastChange = 0;
        this.isRoach1 = true;
        this.isFacingRight = true;
        this.speed = 80; // Set the fixed speed
    }

    onInitialize(engine) {
        console.log("intializing")
        this.pos.x = 500;
        this.pos.y = 500;
        this.engine = engine;  // Store the engine instance
        this.graphics.use(Resources.CockroachRight1.toSprite());
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
            if (this.isRoach1) {
                this.graphics.use(Resources.CockroachRight1.toSprite());
            } else {
                this.graphics.use(Resources.CockroachRight2.toSprite());
            }
        } else {
            if (this.isRoach1) {
                this.graphics.use(Resources.CockroachLeft1.toSprite());
            } else {
                this.graphics.use(Resources.CockroachLeft2.toSprite());
            }
        }
    }

    setRandomDirection() {
        const angle = Math.random() * Math.PI * 2; // Random direction
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
