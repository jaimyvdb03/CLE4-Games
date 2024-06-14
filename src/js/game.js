import '../css/style.css';
import { Engine, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './Player.js';
import { Speedboost } from './Speedboost.js';
import { Lifeboost } from './Lifeboost.js';
import { Life } from './Lifes.js';

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

        // Create instances of Player, Speedboost, Lifeboost
        const player = new Player(100, 300);
        this.add(player);
        this.add(new Speedboost(400, 400));
        this.add(new Lifeboost(600, 400));

        // Add Life instances only at the desired location (75, 50)
        const life = new Life(75, 50, player);
        this.add(life);
    }
}

new Game();
