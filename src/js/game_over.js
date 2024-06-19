import { Actor, Engine, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { vector } from "excalibur/build/dist/Util/DrawUtil.js";

export class Game_over extends Actor{

    onInitialize(engine){
        this.graphics.use(Resources.Deathbanner.toSprite());

        this.pos = new Vector(640, 360);  
    }
}


