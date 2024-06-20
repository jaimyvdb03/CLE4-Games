import { Actor, Vector, CollisionType, Timer, CompositeCollider, Shape } from "excalibur";
import { Resources } from './resources.js';
import { LichProjectile } from "./lich-projectile.js";
import { Enemies } from "./enemies.js";
import { enemyGroup } from "./collisionGroups.js";
import { WeaponProjectile } from "./weaponProjectile.js";

export class Lich extends Enemies {
    constructor(wave, player, spawnX, spawnY) {
        super(Resources.Lich1.width / 1.5, Resources.Lich1.height / 1.2);
        this.player = player;
        this.body.collisionType = CollisionType.Active;
        this.vel = new Vector(0, 0);
        this.isFacingRight = true;
        this.speed = 60;
        this.attackPhase = 0;
        this.attackTimer = null;
        this.attackTimerActive = false;
        this.isAttacking = false;
        this.body.group = enemyGroup;
        this.lives = 2; // Initialize lives
        this.pos = new Vector(spawnX, spawnY);

        // Create the blood overlay actor
        this.bloodOverlay = new Actor({
            width: Resources.LichBlood1.width / 1.5,
            height: Resources.LichBlood1.height / 1.2
        });
        this.bloodOverlay.graphics.use(Resources.LichBlood1.toSprite());
        this.bloodOverlay.graphics.opacity = 0; // Start with invisible blood overlay
    }

    onInitialize(engine) {
        let capsule = new CompositeCollider([
            Shape.Box(60, 100, new Vector(0.48, 0.35)),
        ]);
        this.collider.set(capsule);
        this.engine = engine;

        // Add blood overlay as a child actor
        this.addChild(this.bloodOverlay);
        this.bloodOverlay.pos = new Vector(0, 0); // Adjust position if necessary

        this.toggleSprite();

        this.timer = new Timer({
            interval: 500,
            repeats: true,
            fcn: () => this.toggleSprite()
        });
        engine.add(this.timer);
        this.timer.start();

        this.on('precollision', (event) => this.handleCollision(event));
    }

    toggleSprite() {
        if (!this.isAttacking) {
            let sprite = Resources.Lich1.toSprite();
            sprite.flipHorizontal = !this.isFacingRight; // Flip sprite if not facing right
            this.graphics.use(sprite);
        }
    }

    handleCollision(event) {
        if (event.other instanceof WeaponProjectile) {
            console.log(this.lives)
            this.lives -= 1;
            if (this.lives === 1) {
                this.bloodOverlay.graphics.opacity = 1; // Make blood overlay visible
            }
            if (this.lives <= 0) {
                this.kill();
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

        if (distanceToPlayer <= 500) {
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

                    let sprite;
                    switch (this.attackPhase) {
                        case 0:
                            sprite = Resources.Lich1.toSprite();
                            break;
                        case 1:
                            sprite = Resources.Lich2.toSprite();
                            break;
                        case 2:
                            sprite = Resources.Lich3.toSprite();
                            break;
                        case 3:
                            sprite = Resources.Lich4.toSprite();
                            break;
                        case 4:
                            sprite = Resources.Lich5.toSprite();
                            break;
                    }

                    if (sprite) {
                        sprite.flipHorizontal = !this.isFacingRight;
                        this.graphics.use(sprite);
                    }
                }
            });

            this.engine.add(this.attackTimer);
            this.attackTimer.start();
            this.attackTimerActive = true;
        }
    }

    stopAttackTimer() {
        if (this.attackTimer) {
            this.attackTimer.stop();
            this.attackTimerActive = false;
        }
    }
}
