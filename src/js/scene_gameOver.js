import { Scene, Input, Vector, Buttons } from "excalibur";
import { Game_over } from './game_over.js';
import { Wave1 } from './scene_wave1.js';

export class Game_over_Scene extends Scene {

    onInitialize(engine) {
        let deathbanner = new Game_over();
        this.add(deathbanner);
        this.engine = engine; // Store the engine reference
    }

    onActivate(context) {
        this.on('preupdate', (event) => {
            if (this.engine.input.keyboard.wasPressed(Input.Keys.B)) {

                // Transitie naar Level1Scene
                let reset = true;
                localStorage.setItem('reset', JSON.stringify(reset));
                this.engine.goToScene('wave1'); // Use this.engine

                this.engine.points = 0
            }

            if (this.engine.mygamepad) {
                if (this.engine.mygamepad.isButtonPressed(Buttons.LeftBumper)) {
                    // Transition to Wave1Scene
                    let reset = true;
                    localStorage.setItem('reset', JSON.stringify(reset));
                    this.engine.goToScene('wave1'); // Use this.engine
                }
            }
        });
    }
}
