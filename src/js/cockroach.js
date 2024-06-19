import { Actor, CollisionType, Vector, Timer, CompositeCollider, Shape } from "excalibur";
import { Resources } from './resources.js';
import { Enemies } from "./enemies.js";
import { enemyGroup } from "./collisionGroups.js";

export class Cockroach extends Enemies {
    constructor(wave, player, spawnX, spawnY) {
        super({
            width: Resources.CockroachRight1.width,
            height: Resources.CockroachRight1.height / 2
        });

        this.player = player;
        this.body.collisionType = CollisionType.Active;
        this.vel = new Vector(0, 0);
        this.isRoach1 = true;
        this.isFacingRight = true;
        this.speed = 90; // standaard snelheid
        this.timeSinceLastChange = 0;
        this.body.group = enemyGroup;
        this.pos = new Vector(spawnX, spawnY); // Set initial position
    }

    onInitialize(engine) {
        let capsule = new CompositeCollider([
            Shape.Box(100, 45, new Vector(0.55, 0.45)),
        ]);
        this.collider.set(capsule);
        this.engine = engine;
        this.graphics.use(Resources.CockroachRight1.toSprite());

        this.timer = new Timer({
            interval: 100,
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

    update(engine, delta) {
        super.update(engine, delta);

        // calculate the direction towards the player
        const directionToPlayer = this.player.pos.sub(this.pos).normalize();

        // velocity towards the player
        this.vel = directionToPlayer.scale(this.speed);

        // Update own position based on velocity
        this.pos = this.pos.add(this.vel.scale(delta / 1000));

        this.isFacingRight = this.vel.x >= 0;
    }
}
