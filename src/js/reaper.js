import { Actor, CollisionType, Vector, Timer, CompositeCollider, Shape } from "excalibur";
import { Resources } from './resources.js';
import { Enemies } from "./enemies.js";
import { enemyGroup } from "./collisionGroups.js";
import { WeaponProjectile } from "./weaponProjectile.js";

export class Reaper extends Enemies {
    constructor(wave, player, spawnX, spawnY) {
        super({
            width: Resources.ReaperDefault.width / 2,
            height: Resources.ReaperDefault.height
        });

        this.player = player;
        this.body.collisionType = CollisionType.Active;
        this.vel = new Vector(0, 0);
        this.isFacingRight = true;
        this.speed = 20; // vaste snelheid
        this.timeSinceLastChange = 0;
        this.body.group = enemyGroup;
        this.lives = 4;
        this.pos = new Vector(spawnX, spawnY);
    }

    onInitialize(engine) {
        let capsule = new CompositeCollider([
            Shape.Box(65, 115, new Vector(0.5, 0.45)),
        ]);
        this.collider.set(capsule);

        this.engine = engine;
        this.toggleSprite();
        this.timer = new Timer({
            interval: 500,
            repeats: true,
            fcn: () => this.toggleSprite()
        });
        engine.add(this.timer);
        this.timer.start();

        this.on('collisionstart', (event) => this.handleCollision(event));
    }

    handleCollision(event) {
        if (event.other instanceof WeaponProjectile) {
            this.lives -= 1;
        }
        if (this.lives <= 0) {
            console.log("reaper died");
            this.kill();
        }
        this.toggleSprite(); // Update sprite on life change
    }

    toggleSprite() {
        let sprite;
        sprite = Resources.ReaperDefault.toSprite();
        switch (this.lives) {
            case 4:
                sprite = Resources.ReaperDefault.toSprite();
                break;
            case 3:
                sprite = Resources.ReaperBlood1.toSprite();
                break;
            case 2:
                sprite = Resources.ReaperBlood2.toSprite();
                break;
            case 1:
                sprite = Resources.ReaperBlood3.toSprite();
                break;
        }

        if (!this.isFacingRight) {
            sprite.flipHorizontal = true; // Flip the sprite if facing left
        } else {
            sprite.flipHorizontal = false; // Ensure the sprite is not flipped if facing right
        }

        this.graphics.use(sprite);
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

        // Update sprite based on direction
        this.toggleSprite();
    }
}
