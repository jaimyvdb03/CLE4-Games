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
import { Background2 } from './background2.js';

export class Wave2 extends Scene {
    constructor() {
        super();
        this.scoreLabel = null;
        this.currentWaveLabel = null;
    }
    onInitialize(engine, gamepad) {
        // Adding background
        const background = new Background2();
        this.add(background);

        this.player = new Player(1260, 1800, gamepad);
        this.add(this.player);

        this.camera.strategy.lockToActorAxis(this.player, Axis.X);
        this.camera.strategy.lockToActorAxis(this.player, Axis.Y);
        const boundingBox = new BoundingBox(0, 0, 2780, 1870);
        this.camera.strategy.limitCameraBounds(boundingBox);
    }
}