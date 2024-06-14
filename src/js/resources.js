import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {

    
    Player: new ImageSource('images/player.png'),
    Speedboost: new ImageSource('images/speedboost.png'),
    Lifeboost: new ImageSource('images/lifeboost.png'),
    Life: new ImageSource('images/life.png'),

    CockroachLeft1: new ImageSource('images/roach-left-1.png'),
    CockroachLeft2: new ImageSource('images/roach-left-2.png'),
    CockroachRight1: new ImageSource('images/roach-right-1.png'),
    CockroachRight2: new ImageSource('images/roach-right-2.png'),
    ReaperLeft: new ImageSource('images/reaper-left.png'),
    ReaperRight: new ImageSource('images/reaper-right.png'),
    LichLeft1: new ImageSource('images/lich-left-1.png'),
    LichLeft2: new ImageSource('images/lich-left-2.png'),
    LichLeft3: new ImageSource('images/lich-left-3.png'),
    LichLeft4: new ImageSource('images/lich-left-4.png'),
    LichLeft5: new ImageSource('images/lich-left-5.png'),
    LichRight1: new ImageSource('images/lich-right-1.png'),
    LichRight2: new ImageSource('images/lich-right-2.png'),
    LichRight3: new ImageSource('images/lich-right-3.png'),
    LichRight4: new ImageSource('images/lich-right-4.png'),
    LichRight5: new ImageSource('images/lich-right-5.png'),
    LichProjectile: new ImageSource('images/lich-projectile.png'),
    Bow: new ImageSource('images/bow.png'),
    Spellbook: new ImageSource('images/spellbook.png'),
    Staff: new ImageSource('images/staff.png'),
    ThrowingAxe: new ImageSource('images/throwingAxe.png'),
    Arrow: new ImageSource('images/arrow.png'),
    StaffProjectile: new ImageSource('images/staffProjectile.png'),
    SpellbookProjectile: new ImageSource('images/magicTomeProjectile.png')

}
const ResourceLoader = new Loader([
    Resources.Player,
    Resources.Speedboost,
    Resources.Lifeboost,
    Resources.Life,

    Resources.CockroachLeft1,
    Resources.CockroachLeft2,
    Resources.CockroachRight1,
    Resources.CockroachRight2,
    Resources.ReaperLeft,
    Resources.ReaperRight,
    Resources.LichLeft1,
    Resources.LichLeft2,
    Resources.LichLeft3,
    Resources.LichLeft4,
    Resources.LichLeft5,
    Resources.LichRight1,
    Resources.LichRight2,
    Resources.LichRight3,
    Resources.LichRight4,
    Resources.LichRight5,
    Resources.LichProjectile,
    Resources.Bow,
    Resources.Spellbook,
    Resources.Staff,
    Resources.ThrowingAxe,
    Resources.Arrow,
    Resources.StaffProjectile,
    Resources.SpellbookProjectile
])

export { Resources, ResourceLoader }
