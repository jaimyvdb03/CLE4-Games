import { Scene, Input, Vector, Buttons } from "excalibur";
import { Game_over } from './game_over.js';
import { Wave1 } from './scene_wave1.js';
import { ScoreLabel } from "./scoreLabel.js";

export class Game_over_Scene extends Scene {

    onInitialize(engine) {
        let deathbanner = new Game_over();
        this.add(deathbanner);
        this.engine = engine;

        this.scoreLabel = new ScoreLabel(100, 100);
        this.add(this.scoreLabel);
    }

    onActivate(context) {

        // Update the score label with the player's points
        this.scoreLabel.changeText(`Your score is: ${this.engine.points}`);

        this.on('preupdate', (event) => {

            this.add(this.scoreLabel);
            this.scoreLabel.changeText(this.engine.points);

            if (this.engine.input.keyboard.wasPressed(Input.Keys.B)) {

                // Transitie naar Level1Scene
                let reset = true;
                localStorage.setItem('reset', JSON.stringify(reset));
                localStorage.setItem('reset2', JSON.stringify(reset));

                this.engine.goToScene('wave1'); // Use this.engine
                this.remove(this.scoreLabel);
                this.engine.points = 0
            }

            if (this.engine.mygamepad) {
                if (this.engine.mygamepad.isButtonPressed(Buttons.LeftBumper)) {
                    // Transition to Wave1Scene
                    let reset = true;
                    localStorage.setItem('reset', JSON.stringify(reset));
                    this.engine.goToScene('wave1'); // Use this.engine
                    this.remove(this.scoreLabel);
                    this.engine.points = 0
                }
            }
        });
    }
}
