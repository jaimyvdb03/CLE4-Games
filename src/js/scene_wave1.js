import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Scene, Axis, BoundingBox, Label } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background.js';
import { Player } from './Player.js';
import { Bush } from './map-objects/bush.js';
import { Fence } from './map-objects/fence.js';
import { Bollard } from './map-objects/bollard.js';
import { Playground } from './map-objects/playground.js';
import { Hotel } from './hotel.js';
import { Cockroach } from './cockroach.js';
import { Reaper } from './reaper.js';
import { Lich } from './lich.js';
import { Speedboost } from './Speedboost.js';
import { atk_speed_boost } from './atk_speed_boost.js';
import { Lifeboost } from './Lifeboost.js';
import { Life } from './Lifes.js';
import { WeaponProjectile } from './weaponProjectile.js';

import { WaveLabel } from './waveLabel.js';
import {ScoreLabel} from "./scoreLabel.js";


export class Wave1 extends Scene {
    constructor() {
        super();
        this.scoreLabel = null;
        this.currentWaveLabel = null;
        this.totalWaves = 5;

    }

    resetScene() {

        this.reset = false
        localStorage.removeItem('reset');

        // Verwijder alle actoren
        this.actors.forEach(actor => {
            actor.kill();
        });
        
        // Reset de variabelen
        this.wave = 1;
        this.enemiesLeftBeforeNewWave = 10;
        this.increaseEnemyWave = 10;
        this.spawnTimer = 0;
        this.enemiesKilled = 0;
        this.spawnSpeed = 3;
        this.cockroachSpawnRate = 1;

        // Voeg alle actoren opnieuw toe
        this.makeActors()
    }

    makeActors() {
        // background
        const background1 = new Background;
        this.add(background1);

        // Adding bushes
        const bush1 = new Bush(375, 380, 190, 210, Resources.Bush1, new Vector(0.5, 1)); // x,y,width,height,image,anchor
        this.add(bush1);
        const bush2 = new Bush(665, 380, 190, 210, Resources.Bush2, new Vector(0.5, 1)); // x,y,width,height,image,anchor
        this.add(bush2);
        const bush3 = new Bush(1220, 0, 940, 50, Resources.Bush3, new Vector(1, 0)); // x,y,width,height,image,anchor
        this.add(bush3);

        // Adding fence
        const fence = new Fence();
        this.add(fence);

        // Adding bollards
        const Bollard1 = new Bollard(105, 90, Resources.Bollard1); // x,y,image
        this.add(Bollard1);
        const Bollard2 = new Bollard(115, 260, Resources.Bollard2); // x,y,height,image
        this.add(Bollard2);
        const Bollard3 = new Bollard(115, 470, Resources.Bollard3); // x,y,height,image
        this.add(Bollard3);

        // Adding playground
        const playground = new Playground();
        this.add(playground);

        // Adding hotel
        const hotel = new Hotel();
        this.add(hotel);

        this.add(new Speedboost(400, 400));
        this.add(new atk_speed_boost(400, 500));
        this.add(new Lifeboost(600, 400));
        this.add(new Lifeboost(630, 400));
        this.add(new Lifeboost(660, 400));

        this.player = new Player(1350, 300);
        this.add(this.player);

        this.camera.strategy.lockToActorAxis(this.player, Axis.X);
        const boundingBox = new BoundingBox(0, 0, 2560, 720);
        this.camera.strategy.limitCameraBounds(boundingBox);

        // this.camera.zoom = 1.1;
        // this.camera.strategy.lockToActor(player);
        let lich = new Lich(this.player);
        this.add(lich);

        // let roach = new Cockroach(player);
        // this.add(roach);

        let reaper = new Reaper(this.player);
        this.add(reaper);

        this.lifeDisplay = new Life(this.player);
        this.add(this.lifeDisplay);


        this.currentWaveLabel = new WaveLabel(600, 20, this.totalWaves);
        this.add(this.currentWaveLabel);

        this.scoreLabel = new ScoreLabel(1125, 20);
        this.add(this.scoreLabel);

        this.startWave()
    }

    onInitialize() {
        // adding actors
        this.makeActors()
    }
    
    onActivate() {
        this.reset = JSON.parse(localStorage.getItem('reset'));
        if (this.reset) {
            this.resetScene()
        }
    }

    wave = 1;
    enemiesLeftBeforeNewWave = 10;
    increaseEnemyWave = 10;
    spawnTimer = 0;
    enemiesKilled = 0;
    player;
    spawnSpeed = 3;
    cockroachSpawnRate = 1;
    reset;

    startWave() {
        console.log("Wave: " + this.wave)
        this.increaseEnemyWave += 5; //je moet 5 enemies meer killen voordat nieuwe wave start
        this.enemiesLeftBeforeNewWave = this.increaseEnemyWave;
        this.spawnSpeed = this.spawnSpeed - 0.3; //elke wave spawnen enemies 0.3 sneller

        this.currentWaveLabel.setCurrentWave(this.wave);
    }

    onPreUpdate(engine, delta) {
        this.spawnTimer += delta / 1000;

        const timeBetweenSpawns = this.spawnSpeed / this.cockroachSpawnRate;

        while (this.spawnTimer >= timeBetweenSpawns) {
            const enemy = new Cockroach(this.wave, this.player); //change enemy here
            this.add(enemy);
            this.spawnTimer -= timeBetweenSpawns;
        }
    }

    onEnemyKilled() {
        this.enemiesLeftBeforeNewWave--;
        this.enemiesKilled++;
        console.log(this.enemiesKilled)
        if (this.enemiesLeftBeforeNewWave === 0) {
            this.wave++;
            this.startWave();
        }
    }
}
