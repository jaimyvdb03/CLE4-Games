import { Actor, Engine, Vector, CollisionType, Timer } from "excalibur";
import { Resources } from './resources.js';
import { Enemies } from "./enemies.js";

export class Lich extends Enemies {
    constructor(player) {
        super(Resources.LichRight1.width, Resources.LichRight1.height);
        this.player = player;
        this.body.collisionType = CollisionType.Active;
        this.vel = new Vector(0, 0);
        this.targetPos = new Vector(100, 100);
        this.isFacingRight = true;
        this.speed = 80;
        this.attackPhase = 0;
        this.attackTimer = null; // Timer to control attack animation phases
        this.attackTimerActive = false;
        this.isAttacking = false; // Flag to track if currently in attack animation
    }

    onInitialize(engine) {
        console.log("initializing");
        this.engine = engine;
        this.pos = new Vector(500, 500); // spawn position
        this.toggleSprite(); // Set initial sprite
        this.setToRandomPos();

        this.timer = new Timer({
            interval: 500,
            repeats: true,
            fcn: () => this.toggleSprite()
        });
        engine.add(this.timer);
        this.timer.start();
    }

    toggleSprite() {
        console.log("toggleSprite");
        if (!this.isAttacking) {
            if (this.isFacingRight) {
                this.graphics.use(Resources.LichRight1.toSprite());
            } else {
                this.graphics.use(Resources.LichLeft1.toSprite());
            }
        }
    }

    setToRandomPos() {
        const screenWidth = this.engine.drawWidth;
        const screenHeight = this.engine.drawHeight;

        // random target position
        this.targetPos = new Vector(
            Math.random() * (screenWidth - this.width) + this.width / 2,
            Math.random() * (screenHeight - this.height) + this.height / 2
        );

        // calculate the direction vector towards the target position
        const direction = this.targetPos.sub(this.pos).normalize();

        // velocity towards target position
        this.vel = direction.scale(this.speed);

        this.isFacingRight = this.vel.x >= 0;
    }

    update(engine, delta) {
        super.update(engine, delta);

        // check if lich is at targeted spot
        if (this.pos.distance(this.targetPos) < this.speed * (delta / 1000)) {
            this.vel = new Vector(0, 0); // stop moving
            this.facePlayer();
            this.startAttackAnimation();
        } else {
            this.pos = this.pos.add(this.vel.scale(delta / 1000));
        }
    }

    facePlayer() {
        console.log("faceplayer");
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
                interval: 1000,
                repeats: true,
                fcn: () => {
                    this.attackPhase = (this.attackPhase + 1) % 5;
                    console.log(this.attackPhase);

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
