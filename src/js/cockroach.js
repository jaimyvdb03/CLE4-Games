import { Actor, CollisionType, Vector, Timer, CompositeCollider, Shape } from "excalibur";
import { Resources } from './resources.js';
import { Enemies } from "./enemies.js";
import { enemyGroup } from "./collisionGroups.js";


export class Cockroach extends Enemies {
    constructor(wave, player) {
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
        this.body.group = enemyGroup;
    }

    onInitialize(engine) {
        let capsule = new CompositeCollider([
            Shape.Box(100, 45, new Vector(0.55, 0.45)),
        ])
        this.collider.set(capsule)
        this.engine = engine;
        this.graphics.use(Resources.CockroachRight1.toSprite());

        this.timer = new Timer({
            interval: 100,
            repeats: true,
            fcn: () => this.toggleSprite()
        });
        engine.add(this.timer);
        console.log()
        this.timer.start();

        //pos
        const spawnPositions = [
            new Vector(185, -100),
            new Vector(1350, -100),
            new Vector(2455, -100)
        ];
        const randomIndex = Math.floor(Math.random() * spawnPositions.length);
        this.pos = spawnPositions[randomIndex];
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
