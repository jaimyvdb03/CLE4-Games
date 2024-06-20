import { Scene, Input, Vector } from "excalibur";
import { Game_over } from './game_over.js';
import { Wave1 } from './scene_wave1.js';

export class Game_over_Scene extends Scene {
    onInitialize(engine) {
        let deathbanner = new Game_over();
        this.add(deathbanner);
        this.engine = engine
    }

    onActivate(context) {
        this.on('preupdate', (event) => {
            if (event.engine.input.keyboard.wasPressed(Input.Keys.B)) {

                // Transitie naar Level1Scene
                let reset = true;
                localStorage.setItem('reset', JSON.stringify(reset));
                this.engine.goToScene('wave1');

            }
        });
    }
}
