import { ScreenElement, Vector, Color, Font, Text } from "excalibur";

export class WaveLabel extends ScreenElement {
    constructor(x, y, totalWaves) {
        super({
            pos: new Vector(x, y)
        });

        this.totalWaves = totalWaves; // Totale aantal golven

        this.textGraphic = new Text({
            text: 'Wave: 1/' + this.totalWaves,
            font: new Font({
                size: 38,
                color: Color.Black,
                family: 'Arial',
                strokeColor: Color.Black,
                lineWidth: 2
            })
        });

        this.graphics.add(this.textGraphic);
    }

    setCurrentWave(currentWave) {
        this.textGraphic.text = `Wave: ${currentWave}/${this.totalWaves}`;
    }
}
