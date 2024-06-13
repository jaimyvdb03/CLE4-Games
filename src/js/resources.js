import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Player: new ImageSource('images/test-player.png'),
    Background1: new ImageSource('images/background1.png'),
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Player,
    Resources.Background1,
])

export { Resources, ResourceLoader }
