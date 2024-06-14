import { Actor, Engine, Vector, Keys, CollisionType, DegreeOfFreedom } from "excalibur";
import { Resources } from './resources.js';
import { Bow } from "./bow.js";
import { ThrowingAxe } from "./throwingAxe.js";
import { Spellbook } from "./spellbook.js";
import { Staff } from "./staff.js";

export class Player extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Player.width - 5, height: Resources.Player.height });
        this.body.collisionType = CollisionType.Active; // Active collision type
    }

    onInitialize(engine) {
        this.engine = engine;  // Store the engine instance
        this.body.useGravity = true;
        this.graphics.use(Resources.Player.toSprite());
        this.vel = new Vector(0, 0);
        this.armPlayer()
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = 0;

        //Player movement
        //Up
        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -350;
            this.graphics.flipHorizontal = true;
        }

        //Down
        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 350;
            this.graphics.flipHorizontal = true;
        }

        //Left
        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -350;
            this.graphics.flipHorizontal = false;
        }

        //Right
        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 350;
            this.graphics.flipHorizontal = true;
        }

        this.vel = new Vector(xspeed, yspeed);
    }

    armPlayer() {
        const weapon = new ThrowingAxe()
        this.addChild(weapon)
    }
}
