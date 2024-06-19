import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode, Scene, Axis, BoundingBox, Label } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
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
import {highScoreLabel} from "./highscoreLabel.js";


export class Wave1 extends Scene {
    constructor() {
        super();
        this.scoreLabel = null;
        this.currentWaveLabel = null;
        this.totalWaves = 5;
    }

    onInitialize(engine, gamepad) {
        // Adding background
        const background1 = new Background();
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


        this.player = new Player(1350, 300, gamepad);
        this.add(this.player);

        this.camera.strategy.lockToActorAxis(this.player, Axis.X);
        const boundingBox = new BoundingBox(0, 0, 2560, 720);
        this.camera.strategy.limitCameraBounds(boundingBox);

        this.lifeDisplay = new Life(this.player);
        this.add(this.lifeDisplay);

        this.currentWaveLabel = new WaveLabel(600, 20, this.totalWaves);
        this.add(this.currentWaveLabel);

        this.scoreLabel = new ScoreLabel(1125, 20);
        this.add(this.scoreLabel);

        this.highscore = new highScoreLabel(970, 80);
        this.add(this.highscore);

        this.startWave();
    }

    wave = 1;
    enemiesLeftBeforeNewWave = 5;
    increaseEnemyWave = 5;
    spawnTimer = 0;
    enemiesKilled = 0;
    player;
    spawnSpeed = 4;
    cockroachSpawnRate = 1;

    startWave() {
        if (this.wave === 5) {
            console.log("WE ARE DONE");
        }

        console.log("Wave: " + this.wave);
        this.increaseEnemyWave += 1; // Je moet 5 enemies meer killen voordat nieuwe wave start
        this.enemiesLeftBeforeNewWave = this.increaseEnemyWave;
        this.spawnSpeed = this.spawnSpeed - 0.3; // Elke wave spawnen enemies 0.3 sneller

        this.currentWaveLabel.setCurrentWave(this.wave);
    }

    onPreUpdate(engine, delta) {
        this.spawnTimer += delta / 1000;

        const timeBetweenSpawns = this.spawnSpeed / this.cockroachSpawnRate;

        while (this.spawnTimer >= timeBetweenSpawns) {
            const spawnX = 1330 + Math.random() * (1370 - 1330);
            const spawnY = -100;
            const enemy = new Cockroach(this.wave, this.player, spawnX, spawnY); // Change enemy here
            this.add(enemy);
            this.spawnTimer -= timeBetweenSpawns;
            if (this.enemiesKilled >= 5) {
                console.log("special enemy")
                const spawnX = 185
                const spawnY = 50;
                const enemy = new Cockroach(this.wave, this.player, spawnX, spawnY); // Change enemy here
                this.add(enemy);
            }
            if (this.wave === 3) {
                const spawnX = 2455
                const spawnY = 50;
                const enemy = new Cockroach(this.wave, this.player, spawnX, spawnY); // Change enemy here
                this.add(enemy);
            }
        }
    }

    spawnPowerUp(type) {
        const spawnX = 130 + Math.random() * (2500 - 130);
        const spawnY = 420 + Math.random() * (650 - 420);

        if (type === 'health') {
            const lifeboost = new Lifeboost(spawnX, spawnY);
            this.add(lifeboost);
        } else if (type === 'speed') {
            const speedboost = new Speedboost(spawnX, spawnY);
            this.add(speedboost);
        }
        else if (type === 'attack') {
            const attackboost = new atk_speed_boost(spawnX, spawnY);
            this.add(attackboost);
        }
    }

    onEnemyKilled() {
        this.enemiesLeftBeforeNewWave--;
        this.enemiesKilled++;
        console.log(this.enemiesKilled);
        if (this.enemiesLeftBeforeNewWave === 0) {
            this.wave++;
            this.startWave();
        }
        if (this.enemiesKilled % 10 === 0) {
            this.spawnPowerUp('health');
        }

        if (this.enemiesKilled % 15 === 0) {
            this.spawnPowerUp('speed');
        }
        if (this.enemiesKilled % 15 === 0) {
            this.spawnPowerUp('attack');
        }
    }
}
