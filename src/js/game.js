import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Wave1 } from './scene_level1.js';


export class Game extends Engine {
    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen

        });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("start de game!");

        this.add('wave1', new Wave1());

        // Start with the intro scene
        this.goToScene('wave1');

    }
}

new Game();
