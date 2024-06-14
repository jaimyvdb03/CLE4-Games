import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Player: new ImageSource('images/test-player.png'),
    Background1: new ImageSource('images/background1.png'),
    Bush1: new ImageSource('images/object-bush1.png'),
    Bush2: new ImageSource('images/object-bush2.png'),
    Bush3: new ImageSource('images/object-bush3.png'),
    Fence: new ImageSource('images/object-fence.png'),
    Bollard1: new ImageSource('images/object-bollard1.png'),
    Bollard2: new ImageSource('images/object-bollard2.png'),
    Bollard3: new ImageSource('images/object-bollard3.png'),
    Playground: new ImageSource('images/object-playground.png'),
    Hotel: new ImageSource('images/object-hotel.png'),
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Player,
    Resources.Background1,
    Resources.Bush1,
    Resources.Bush2,
    Resources.Bush3,
    Resources.Fence,
    Resources.Bollard1,
    Resources.Bollard2,
    Resources.Bollard3,
    Resources.Playground,
    Resources.Hotel,
])

export { Resources, ResourceLoader }
