import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Player: new ImageSource('images/player.png'),
    Speedboost: new ImageSource('images/speedboost.png'),
    Lifeboost: new ImageSource('images/lifeboost.png'),
    Life: new ImageSource('images/life.png'),
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Player,
    Resources.Speedboost,
    Resources.Lifeboost,
    Resources.Life,
])

export { Resources, ResourceLoader }
