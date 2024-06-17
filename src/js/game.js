import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode, Input } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Wave1 } from './scene_wave1.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 2560,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen

        });
        this.start(ResourceLoader).then(() => this.startGame());
        this.points = 0

    }

    waitForGamepad() {
        console.log("Waiting for gamepad connection...");

        window.addEventListener('gamepadconnected', (event) => {
            console.log('Gamepad connected:', event.gamepad);
            this.startGame(event.gamepad);
        });
    }

    addPoints(addedPoints) {
        this.points += addedPoints
        console.log(`${this.points} punten!`)
    }

    wave = 1;
    enemiesLeft = 0;
    spawnTimer = 0;
    enemiesToSpawn = 0;
    player;

    startWave() {
        const numberOfEnemies = this.wave + 2; // change enemy amount here
        this.enemiesToSpawn = numberOfEnemies;
        this.enemiesLeft = numberOfEnemies;
        this.spawnTimer = 0;
    }

    onPreUpdate(engine, delta) {
        this.spawnTimer += delta / 1000; // change spawn time here

        if (this.enemiesToSpawn > 0 && this.spawnTimer >= 1) {
            const enemy = new Cockroach(this.wave, this.player); //change enemy here
            this.add(enemy);
            this.enemiesToSpawn--;
            this.spawnTimer = 0;
        }
    }

    onEnemyKilled() {
        this.enemiesLeft--;
        if (this.enemiesLeft === 0) {
            this.wave++;
            this.startWave();
        }

    }

  //game.js naar scene 1
    startGame(gamepad) {
        console.log("Start de game!");

        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected")
            this.mygamepad = connectevent.gamepad
        })

        this.add('wave1', new Wave1(gamepad));

        // Start with the intro scene
        this.goToScene('wave1');

        }
}

  //overige functie moeten naar scene 1 & camara lock op speler
  
 

    


new Game();
