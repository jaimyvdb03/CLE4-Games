import { Actor, Vector, CollisionType, ScreenElement } from "excalibur";
import { Resources } from './resources.js';

export class Life extends ScreenElement {
    constructor(player, offsetX = 20, offsetY = 20) {
        super({ x: offsetX, y: offsetY });
        this.name = 'life';
        this.player = player; // Store player instance
        this.lifeActors = []; // Array to store life actors
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    onInitialize(engine) {
        this.engine = engine; // Store the engine reference
        this.updateLivesDisplay(); // Initial setup of life actors
    }

    updateLivesDisplay() {
        // Remove existing life actors
        this.lifeActors.forEach(actor => actor.kill());
        this.lifeActors = [];

        // Create life actors based on current player lifes
        for (let i = 0; i < this.player.lifes; i++) {
            const life = new Actor({
                pos: new Vector(this.offsetX + i * 50, this.offsetY),
                width: Resources.Life.width,
                height: Resources.Life.height,
            });
            life.graphics.use(Resources.Life.toSprite());
            life.body.collisionType = CollisionType.Passive;
            life.scale = new Vector(2, 2);
            this.addChild(life); // Adding life as a child of the ScreenElement
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
