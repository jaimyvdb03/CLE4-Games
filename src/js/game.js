import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode, Input } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Wave1 } from './scene_wave1.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen

        });
        this.start(ResourceLoader).then(() => this.startGame());
        this.points = 0

    }

    addPoints(addedPoints) {
        this.points += addedPoints;
        const currentScene = this.currentScene;
        if (currentScene && currentScene.scoreLabel) {
            currentScene.scoreLabel.changeText(this.points);
        }
    }



    //game.js naar scene 1
    startGame(gamepad) {
        console.log("Start de game!");

        this.add('wave1', new Wave1());
        // Start with the intro scene
        this.goToScene('wave1');

        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected")
            this.mygamepad = connectevent.gamepad
        })

    }
}

//overige functie moeten naar scene 1 & camara lock op speler






new Game();
