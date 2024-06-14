import { Actor, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class Spellbook extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.Spellbook.width, height: Resources.Spellbook.height })
        this.direction = 1
    }

    onInitialize(engine) {
        const spellbookSprite = Resources.Spellbook.toSprite()
        spellbookSprite.scale = new Vector(0.15, 0.15)
        this.graphics.use(spellbookSprite)
        this.pos.x = 20
    } 

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            if (this.direction === 1) {
                this.scaleX = 0.1
            } else {
                this.scaleX = -0.1
            }
            const projectile = new WeaponProjectile(
                // X pos, Y pos, Image, X scale, Y scale, X vel, Y vel, Angular vel
                this.parent.pos.x, this.parent.pos.y, Resources.SpellbookProjectile, 0.1, 0.1, 700, 0, 200, this.direction)
            engine.add(projectile)
        }
    }   
}