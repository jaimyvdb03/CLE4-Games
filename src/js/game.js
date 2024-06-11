import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './Player.js'
import { Speedboost } from './Speedboost.js'
import { Lifeboost } from './Lifeboost.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        
        this.add(new Player(100, 300));

        this.add(new Speedboost (400, 400));
        this.add(new Lifeboost (600, 400));
    }
}

new Game()
