import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Player: new ImageSource('images/test-player.png')
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Player,
])

export { Resources, ResourceLoader }
