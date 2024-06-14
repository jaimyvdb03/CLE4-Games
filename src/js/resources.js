import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Player: new ImageSource('images/test-player.png'),
    Bow: new ImageSource('images/bow.png'),
    Spellbook: new ImageSource('images/spellbook.png'),
    Staff: new ImageSource('images/staff.png'),
    ThrowingAxe: new ImageSource('images/throwingAxe.png'),
    Arrow: new ImageSource('images/arrow.png'),
    StaffProjectile: new ImageSource('images/staffProjectile.png'),
    SpellbookProjectile: new ImageSource('images/magicTomeProjectile.png')
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Player,
    Resources.Bow,
    Resources.Spellbook,
    Resources.Staff,
    Resources.ThrowingAxe,
    Resources.Arrow,
    Resources.StaffProjectile,
    Resources.SpellbookProjectile
])

export { Resources, ResourceLoader }
