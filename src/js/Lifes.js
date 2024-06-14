import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Life extends Actor {
    constructor(x, y, player) {
        super({ x, y, width: Resources.Life.width, height: Resources.Life.height });
        this.name = 'life';
        this.player = player; // Store player instance
        this.lifeActors = []; // Array to store life actors
    }

    onInitialize() {
        this.updateLivesDisplay(); // Initial setup of life actors
    }

    updateLivesDisplay() {
        // Remove existing life actors
        this.lifeActors.forEach(actor => actor.kill());
        this.lifeActors = [];

        // Create life actors based on current player lifes
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
            this.lifeActors.push(life); // Store reference
        }
    }

    // Override onPostUpdate to update lives display
    onPostUpdate(engine, delta) {
        super.onPostUpdate(engine, delta);
        // Check if player lifes have changed
        if (this.lifeActors.length !== this.player.lifes) {
            this.updateLivesDisplay();
        }
    }
}
