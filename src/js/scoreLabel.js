import { ScreenElement, Vector, Color, Font, GraphicsComponent, Text } from "excalibur";
import { Wave1 } from "./scene_wave1.js";

export class ScoreLabel extends ScreenElement {
    constructor(x, y) {
        super({
            pos: new Vector(x, y)
        });

        this.textGraphic = new Text({
            text: '0000',
            font: new Font({
                size: 60,
                color: Color.White,
                family: 'Arial',
                strokeColor: Color.Black,
                lineWidth: 2
            })
        });

        this.graphics.use(this.textGraphic);
    }

    changeText(points) {
        if (points < 100) {
            this.textGraphic.text = `00${points.toString()}`
        }
        else if(points < 1000) {
            this.textGraphic.text = `0${points.toString()}`
        }
        else if (points < 10000) {
            this.textGraphic.text = points.toString()
        }
    }
}
