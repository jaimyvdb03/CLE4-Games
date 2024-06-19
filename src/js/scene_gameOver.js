import { Scene, Input, Vector } from "excalibur";
import { Game_over } from './game_over.js';
import { Wave1 } from './scene_wave1.js';

export class Game_over_Scene extends Scene {
    onInitialize(engine) {
        let deathbanner = new Game_over();
        this.add(deathbanner);
    }

    onActivate(context) {
        this.on('preupdate', (event) => {
            if (event.engine.input.keyboard.wasPressed(Input.Keys.B)) {
                                
                // Reinitialiseer Level1Scene
                let wave1 = new Wave1(event.engine);
                event.engine.add('Wave1', wave1);
                
                // Transitie naar Level1Scene
                event.engine.goToScene('Wave1');
            }
        });
    }
}
