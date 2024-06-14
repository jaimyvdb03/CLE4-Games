import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class LichProjectile extends Actor {
    constructor(startPosition, targetPosition) {
        super({
            x: startPosition.x,
            y: startPosition.y,
            width: Resources.LichProjectile.width / 4, // Half the width
            height: Resources.LichProjectile.height / 4, // Half the height
        });

        this.collisionType = CollisionType.Passive; // Passive collision type
        this.vel = targetPosition.sub(startPosition).normalize().scale(400); // Velocity towards the player

        const sprite = Resources.LichProjectile.toSprite();
        sprite.scale = new Vector(0.3, 0.3);
        this.graphics.use(sprite);


    }

    update(engine, delta) {
        super.update(engine, delta);

        // Remove projectile when it leaves the screen
        if (this.pos.x < 0 || this.pos.x > engine.drawWidth || this.pos.y < 0 || this.pos.y > engine.drawHeight) {
            this.kill();
        }
    }
}
