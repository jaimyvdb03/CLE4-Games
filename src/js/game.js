import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './Player.js'
import { Cockroach } from './cockroach.js'
import { Reaper } from './reaper.js'
import { Lich } from './lich.js'

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

        let player = new Player(100, 300);
        this.add(player);
        //this.camera.zoom = 1.1;
        //this.camera.strategy.lockToActor(player);

        let roach = new Cockroach();
        this.add(roach);

        let reaper = new Reaper();
        this.add(reaper);

        let lich = new Lich(player);
        this.add(lich);
    }
}

new Game()
