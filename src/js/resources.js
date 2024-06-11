import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Player: new ImageSource('images/player.png'),
    Speedboost: new ImageSource('images/speedboost.png'),
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Player,
    Resources.Speedboost,
])

export { Resources, ResourceLoader }
