import { Font, Label, Vector, Color } from "excalibur";

export class ScoreLabel extends Label {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            text: '0',
            font: new Font({
                size: 100,
                color: Color.White,
                family: 'Arial',
                strokeColor: Color.Black,
                lineWidth: 4
            })
        });
    }

    changeText(points) {
        this.text = points.toString();
    }
}
