import { Actor, Vector, Engine, CollisionGroup } from "excalibur";
import { Resources } from './resources.js';
import { enemyGroup } from './collisionGroups.js';

export class Enemies extends Actor {
    constructor(width, height) {
        super({
            width: width,
            height: height
        });
    }

    onInitialize(engine) {
        this.engine = engine;
        this.body.group = enemyGroup;
        console.log(this.body.group)
    }

    update(engine, delta) {
        super.update(engine, delta);

        /*
        const screenHeight = engine.drawHeight;

        // Enemy blijft in het scherm, horizontaal
        if (this.pos.x < this.width / 2) {
            this.pos.x = this.width / 2;
        } else if (this.pos.x > 2560 - this.width / 2) {
            this.pos.x = 2560 - this.width / 2;
        }

        // Enemy blijft in het scherm, verticaal
        if (this.pos.y < this.height / 2) {
            this.pos.y = this.height / 2;
        } else if (this.pos.y > screenHeight - this.height / 2) {
            this.pos.y = screenHeight - this.height / 2;
        }
        */
    }
}
