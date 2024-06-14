import { Actor, CollisionType, Vector, Timer } from "excalibur";
import { Resources } from './resources.js';

export class Cockroach extends Actor {
    constructor(player) {
        super({
            width: Resources.CockroachRight1.width,
            height: Resources.CockroachRight1.height / 2
        });

        this.player = player;
        this.body.collisionType = CollisionType.Active;
        this.vel = new Vector(0, 0);
        this.isRoach1 = true;
        this.isFacingRight = true;
        this.speed = 65; //standaard snelheid
        this.timeSinceLastChange = 0;
    }

    onInitialize(engine) {
        this.engine = engine;
        this.pos.x = 500;
        this.pos.y = 500;
        this.graphics.use(Resources.CockroachRight1.toSprite());

        this.timer = new Timer({
            interval: 100,
            repeats: true,
            fcn: () => this.toggleSprite()
        });
        engine.add(this.timer);
        console.log()
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

    update(engine, delta) {
        super.update(engine, delta);

        // calculate de direction naar de player
        const directionToPlayer = this.player.pos.sub(this.pos).normalize();

        // velocity naar de player
        this.vel = directionToPlayer.scale(this.speed);

        // Update eigen positie op bases van velocity
        this.pos = this.pos.add(this.vel.scale(delta / 1000));

        this.isFacingRight = this.vel.x >= 0;
    }
}
