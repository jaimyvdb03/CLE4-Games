import { Actor, Keys, Vector} from "excalibur"
import { Resources } from './resources'
import { WeaponProjectile } from "./weaponProjectile"

export class Bow extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.Bow.width, height: Resources.Bow.height })
        this.direction = 1
        this.shootCooldown = 400
        this.lastShotTime = 1000
        this.atkSpeedBoostActive = false;
    }

    onInitialize(engine) {
        const bowSprite = Resources.Bow.toSprite()
        bowSprite.scale = new Vector(0.13, 0.13)
        this.graphics.use(bowSprite)
    }

    onPreUpdate(engine) {
        this.currentTime = Date.now()

        // Adjust position based on player's direction
        if (this.direction === 1) {
            this.pos = new Vector(35, 10); 
        } else {
            this.pos = new Vector(-35, 10); 
        }

        if (engine.input.keyboard.wasPressed(Keys.Space) && (this.currentTime - this.lastShotTime >= this.shootCooldown)) {
            this.lastShotTime = this.currentTime

            if (this.direction === 1) {
                this.scaleX = 0.15
            } else {
                this.scaleX = -0.15
            }
            const projectileSpeed = this.atkSpeedBoostActive ? 1500 : 800;
            const projectileXPos = this.direction === 1 ? this.parent.pos.x + 70 : this.parent.pos.x - 70;

            const projectile = new WeaponProjectile(
                // X pos, Y pos, Image, X scale, Y scale, X vel, Y vel, Angular vel
                projectileXPos, this.parent.pos.y + 10, Resources.Arrow, this.scaleX, 0.15, projectileSpeed, 0, 0, this.direction,
                Resources.Arrow.width / 15, Resources.Arrow.height /85)
            engine.add(projectile)
        }

        //  // Check for shooting with R1 button
        //  if (engine.mygamepad.isButtonPressed(Buttons.RightTrigger)) {
        //     // this.weapon.shoot();
        //     console.log('phew pauw')
        //     if (this.direction === 1) {
        //         this.scaleX = 0.15  
        //     } else {
        //         this.scaleX = -0.15
        //     }
        //     const projectile = new WeaponProjectile(
        //         // X pos, Y pos, Image, X scale, Y scale, X vel, Y vel, Angular vel
        //         this.parent.pos.x, this.parent.pos.y, Resources.Arrow, this.scaleX, 0.15, 800, 0, 0, this.direction,
        //         Resources.Arrow.width / 15, Resources.Arrow.height /15)
        //     engine.add(projectile)
        // }
    }   

    setAttackSpeedBoost(active) {
        this.atkSpeedBoostActive = active;
        this.shootCooldown = active ? 220 : 400; // Half the cooldown if boost is active
    }
}