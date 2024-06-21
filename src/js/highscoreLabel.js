import { ScreenElement, Vector, Color, Font, GraphicsComponent, Text } from "excalibur";

export class highScoreLabel extends ScreenElement {
    constructor(x, y) {
        super({
            pos: new Vector(x, y)
        });

        // Initialize text graphic with initial highscore (if available)
        const highscore = localStorage.getItem('highscore') || '0000'; // Default to '0000' if no highscore found

        this.textGraphic = new Text({
            text:`highscore: ${highscore}`,
            font: new Font({
                size: 40,
                color: Color.Yellow,
                family: 'Arial',
                strokeColor: Color.Black,
                lineWidth: 1
            })
        });

        this.graphics.use(this.textGraphic);
    }
}
