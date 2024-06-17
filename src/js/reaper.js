import { Actor, CollisionType, Vector, Timer, CompositeCollider, Shape } from "excalibur";
import { Resources } from './resources.js';
import { Enemies } from "./enemies.js";
import { enemyGroup } from "./collisionGroups.js";


export class Reaper extends Enemies {
    constructor(player) {
        super({
            width: Resources.ReaperRight.width / 2,
            height: Resources.ReaperRight.height
        });

        this.player = player;
        this.body.collisionType = CollisionType.Active;
        this.vel = new Vector(0, 0);
        this.isFacingRight = true;
        this.speed = 50; // vaste snelheid
        this.timeSinceLastChange = 0;
        this.body.group = enemyGroup;

    }

    onInitialize(engine) {
        let capsule = new CompositeCollider([
            Shape.Box(65, 115, new Vector(0.5, 0.45)),
        ])
        this.collider.set(capsule)

        this.engine = engine;
        this.pos = new Vector(1350, 100);
        this.toggleSprite()
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

        // calculate de direction naar de player
        const directionToPlayer = this.player.pos.sub(this.pos).normalize();

        // velocity naar de player
        this.vel = directionToPlayer.scale(this.speed);

        // Update eigen positie op bases van velocity
        this.pos = this.pos.add(this.vel.scale(delta / 1000));

        this.isFacingRight = this.vel.x >= 0;
    }
}
