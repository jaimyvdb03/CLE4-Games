import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Player } from './Player.js'; // Import Player class

export class Life extends Actor {
    constructor(x, y, player) {
        super({ x, y, width: Resources.Life.width, height: Resources.Life.height });
        this.name = 'life';
        this.player = player; // Store player instance

        // Ensure player instance is passed correctly
        if (!(this.player instanceof Player)) {
            throw new Error('Invalid player instance provided to Life');
        }
    }

    onInitialize() {
        for (let i = 0; i < this.player.lifes; i++) {
            const life = new Actor({
                pos: new Vector(this.pos.x + i * 50, this.pos.y),
                width: Resources.Life.width,
                height: Resources.Life.height,
            });
            life.graphics.use(Resources.Life.toSprite());
            life.body.collisionType = CollisionType.Passive;
            life.scale = new Vector(2, 2);
            this.scene.add(life); // Adding life to the scene
        }
    }
}
