import { Actor, Vector, Engine } from "excalibur";
import { Resources } from './resources.js';

export class Enemies extends Actor {
    constructor(width, height) {
        super({
            width: width,
            height: height
        });
        console.log("enemy constructor")
    }

    onInitialize(engine) {
        this.engine = engine;
    }

    update(engine, delta) {
        super.update(engine, delta);

        const screenWidth = engine.drawWidth;
        const screenHeight = engine.drawHeight;

        // Enemy blijft in het scherm, horizontaal
        if (this.pos.x < this.width / 2) {
            this.pos.x = this.width / 2;
        } else if (this.pos.x > screenWidth - this.width / 2) {
            this.pos.x = screenWidth - this.width / 2;
        }

        // Enemy blijft in het scherm, verticaal
        if (this.pos.y < this.height / 2) {
            this.pos.y = this.height / 2;
        } else if (this.pos.y > screenHeight - this.height / 2) {
            this.pos.y = screenHeight - this.height / 2;
        }
    }
}
