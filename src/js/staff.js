import { Actor, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class Staff extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.Staff.width, height: Resources.Staff.height })
    }

    onInitialize(engine) {
        const staffSprite = Resources.Staff.toSprite()
        staffSprite.scale = new Vector(0.18, 0.18)
        this.graphics.use(staffSprite)
        this.pos.x = 30
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            const projectile = new WeaponProjectile(
                // X pos, Y pos, Image, X scale, Y scale, X vel, Y vel, Angular vel
                this.parent.pos.x, this.parent.pos.y, Resources.StaffProjectile, 0.1, 0.1, 700, 0, 200)
            engine.add(projectile)
        }
    }  
}