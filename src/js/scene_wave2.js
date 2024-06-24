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
import { ScoreLabel } from "./scoreLabel.js";
import { highScoreLabel } from "./highscoreLabel.js";
import { Background2 } from './background2.js';
import { Dpad_equip } from "./Dpad.js";

export class Wave2 extends Scene {
    constructor() {
        super();
        this.scoreLabel = null;
        this.currentWaveLabel = null;
        this.totalWaves = "\u221E"; // Infinity symbol
    }

    onInitialize(engine, gamepad) {
        // Adding background
        const background = new Background2();
        this.add(background);

        this.Dpad = new Dpad_equip(30, 550)
        this.add(this.Dpad);

        this.player = new Player(1260, 1800, gamepad);
        this.add(this.player);

        this.camera.strategy.lockToActorAxis(this.player, Axis.X);
        this.camera.strategy.lockToActorAxis(this.player, Axis.Y);
        const boundingBox = new BoundingBox(0, 0, 2780, 1870);
        this.camera.strategy.limitCameraBounds(boundingBox);

        this.lifeDisplay = new Life(this.player);
        this.add(this.lifeDisplay);

        this.currentWaveLabel = new WaveLabel(600, 20, this.totalWaves);
        this.add(this.currentWaveLabel);

        this.scoreLabel = new ScoreLabel(1125, 20);
        this.add(this.scoreLabel);

        this.highscore = new highScoreLabel(970, 80);
        this.add(this.highscore);

        let topCockroach = new Cockroach(this.wave, this.player, 1260, 30);
        this.add(topCockroach);
        let rightCockroach = new Cockroach(this.wave, this.player, 2590, 1420);
        this.add(rightCockroach);
        let leftCockroach = new Cockroach(this.wave, this.player, 20, 1440);
        this.add(leftCockroach);

        this.startWave();
    }

    wave = 1;
    enemiesKilled = 0; // Track enemies killed

    cockroachSpawnTimer = 0;
    lichSpawnTimer = 0;
    reaperSpawnTimer = 0;

    cockroachSpawnInterval = 5; // seconds
    lichSpawnInterval = 10; // seconds
    reaperSpawnInterval = 15; // seconds

    startWave() {
        console.log("Wave: " + this.wave);
        // @ts-ignore
        this.currentWaveLabel.setCurrentWave(this.wave);
    }

    onEnemyKilled() {
        this.enemiesKilled++;
        console.log(this.enemiesKilled);
        if (this.enemiesKilled % 5 === 0) { // Increase wave every 5 kills
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

    spawnCockroach() {
        let topCockroach = new Cockroach(this.wave, this.player, 1260, 30);
        this.add(topCockroach);

        if (this.wave >= 2 && this.wave < 8) {
            const spawnLocation = Math.random() < 0.5 ? 'right' : 'left';
            if (spawnLocation === 'right') {
                let randomCockroach = new Cockroach(this.wave, this.player, 2590, 1420);
                this.add(randomCockroach);
            } else {
                let randomCockroach = new Cockroach(this.wave, this.player, 20, 1440);
                this.add(randomCockroach);
            }
        }
        else if (this.wave >= 8) {
            let rightCockroach = new Cockroach(this.wave, this.player, 2590, 1420);
            this.add(rightCockroach);
            let leftCockroach = new Cockroach(this.wave, this.player, 20, 1440);
            this.add(leftCockroach);
        }
    }


    spawnLich() {
        console.log("default lich")
        let topLich = new Lich(this.wave, this.player, 1260, 30);
        this.add(topLich);

        if (this.wave >= 6 && this.wave < 13) {
            console.log("left or right lich")
            const spawnLocation = Math.random() < 0.5 ? 'right' : 'left';
            if (spawnLocation === 'right') {
                let randomLich = new Lich(this.wave, this.player, 2590, 1420);
                this.add(randomLich);
            } else {
                let randomLich = new Lich(this.wave, this.player, 20, 1440);
                this.add(randomLich);
            }
        }
        else if (this.wave >= 13) {
            let rightLich = new Lich(this.wave, this.player, 2590, 1420);
            this.add(rightLich);
            let leftLich = new Lich(this.wave, this.player, 20, 1440);
            this.add(leftLich);
        }
    }


    spawnReaper() {
        let spawnX, spawnY;
        if (this.wave > 10) {
            spawnX = 1260;
            spawnY = 30;
            let topReaper = new Reaper(this.wave, this.player, 1260, 30);
            this.add(topReaper);
        }

        if (this.wave >= 5 && this.wave < 10) {
            const spawnLocation = Math.random() < 0.5 ? 'right' : 'left';
            if (spawnLocation === 'right') {
                let randomReaper = new Reaper(this.wave, this.player, 2590, 1420);
                this.add(randomReaper);
            } else {
                let randomReaper = new Reaper(this.wave, this.player, 20, 1440);
                this.add(randomReaper);
            }
        }
        else if (this.wave >= 10) {
            let rightReaper = new Reaper(this.wave, this.player, 2590, 1420);
            this.add(rightReaper);
            let leftReaper = new Reaper(this.wave, this.player, 20, 1440);
            this.add(leftReaper);
        }
    }


    onPreUpdate(engine, delta) {
        // Convert delta to seconds
        const deltaTime = delta / 1000;

        // Update timers
        this.cockroachSpawnTimer += deltaTime;
        this.lichSpawnTimer += deltaTime;
        this.reaperSpawnTimer += deltaTime;

        // Spawn cockroaches
        if (this.cockroachSpawnTimer >= this.cockroachSpawnInterval) {
            this.spawnCockroach();
            this.cockroachSpawnTimer = 0; // Reset timer
        }

        // Spawn liches
        if (this.lichSpawnTimer >= this.lichSpawnInterval) {
            this.spawnLich();
            this.lichSpawnTimer = 0; // Reset timer
        }

        // Spawn reapers
        if (this.reaperSpawnTimer >= this.reaperSpawnInterval) {
            this.spawnReaper();
            this.reaperSpawnTimer = 0; // Reset timer
        }
    }

    spawnPowerUp(type) {
        const spawnX = 690 + Math.random() * (2780 - 690);
        const spawnY = 1220 + Math.random() * (1870 - 1220);

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
}

