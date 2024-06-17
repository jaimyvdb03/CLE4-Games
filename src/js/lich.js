import { Actor, Engine, Vector, CollisionType, Timer, CompositeCollider, Shape } from "excalibur";
import { Resources } from './resources.js';
import { LichProjectile } from "./lich-projectile.js";
import { Enemies } from "./enemies.js";
import { enemyGroup } from "./collisionGroups.js";

export class Lich extends Enemies {
    constructor(player) {
        super(Resources.LichRight1.width / 1.5, Resources.LichRight1.height / 1.2);
        this.player = player;
        this.body.collisionType = CollisionType.Active;
        this.vel = new Vector(0, 0);
        this.isFacingRight = true;
        this.speed = 80;
        this.attackPhase = 0;
        this.attackTimer = null;
        this.attackTimerActive = false;
        this.isAttacking = false;
        this.body.group = enemyGroup;
    }

    onInitialize(engine) {
        let capsule = new CompositeCollider([
            Shape.Box(60, 100, new Vector(0.48, 0.35)),
        ])
        this.collider.set(capsule)
        this.engine = engine;
        this.pos = new Vector(1350, 100); // spawn position
        this.toggleSprite();

        this.timer = new Timer({
            interval: 500,
            repeats: true,
            fcn: () => this.toggleSprite()
        });
        engine.add(this.timer);
        this.timer.start();
    }

    toggleSprite() {
        if (!this.isAttacking) {
            if (this.isFacingRight) {
                this.graphics.use(Resources.LichRight1.toSprite());
            } else {
                this.graphics.use(Resources.LichLeft1.toSprite());
            }
        }
    }


    update(engine, delta) {
        super.update(engine, delta);

        // calculate de direction naar de player
        const directionToPlayer = this.player.pos.sub(this.pos).normalize();

        // velocity naar de player
        this.vel = directionToPlayer.scale(this.speed);

        // check hoe ver de player is
        const distanceToPlayer = this.pos.distance(this.player.pos);

        if (distanceToPlayer <= 650) {
            this.vel = new Vector(0, 0); // stop met bewegen
            this.facePlayer();
            this.startAttackAnimation();
        } else {
            // ga richting de player pos
            this.pos = this.pos.add(this.vel.scale(delta / 1000));
        }
    }

    facePlayer() {
        const playerPos = this.player.pos;
        const directionToPlayer = playerPos.sub(this.pos).normalize();

        this.isFacingRight = directionToPlayer.x >= 0;
        this.toggleSprite();
    }

    startAttackAnimation() {
        if (!this.attackTimerActive) {
            this.attackPhase = 0;
            this.isAttacking = true;

            this.attackTimer = new Timer({
                interval: 800,
                repeats: true,
                fcn: () => {
                    this.attackPhase = (this.attackPhase + 1) % 5;

                    if (this.attackPhase === 0) {
                        const projectile = new LichProjectile(this.pos, this.player.pos);
                        this.engine.add(projectile);
                    }

                    if (this.isFacingRight) {
                        if (this.attackPhase === 0) {
                            this.graphics.use(Resources.LichRight1.toSprite());
                        } else if (this.attackPhase === 1) {
                            this.graphics.use(Resources.LichRight2.toSprite());
                        } else if (this.attackPhase === 2) {
                            this.graphics.use(Resources.LichRight3.toSprite());
                        } else if (this.attackPhase === 3) {
                            this.graphics.use(Resources.LichRight4.toSprite());
                        } else if (this.attackPhase === 4) {
                            this.graphics.use(Resources.LichRight5.toSprite());
                        }
                    } else {
                        if (this.attackPhase === 0) {
                            this.graphics.use(Resources.LichLeft1.toSprite());
                        } else if (this.attackPhase === 1) {
                            this.graphics.use(Resources.LichLeft2.toSprite());
                        } else if (this.attackPhase === 2) {
                            this.graphics.use(Resources.LichLeft3.toSprite());
                        } else if (this.attackPhase === 3) {
                            this.graphics.use(Resources.LichLeft4.toSprite());
                        } else if (this.attackPhase === 4) {
                            this.graphics.use(Resources.LichLeft5.toSprite());
                        }
                    }
                }
            });

            this.engine.add(this.attackTimer);
            this.attackTimer.start();
            this.attackTimerActive = true;
        }
    }
}
