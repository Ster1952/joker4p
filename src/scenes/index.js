import TitleScreen from './TitleScreen.js'
import Game from './Game.js'
import Instructions from './InstructionScene.js';
import Winner_YB_Screen from './Winner_YB_Screen.js'
import Winner_GR_Screen from './Winner_GR_Screen.js'


const config = {
    type: Phaser.AUTO,
    backgroundColor: '#616161',
    parent: 'phaser-container',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1260,
        height: 815,
    },
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    title: 'JOKERS-4P'
    
}
// resolutions 1280 x 720 or 1920 x 1080
const game = new Phaser.Game(config)

game.scene.add('titlescreen', TitleScreen, true)
game.scene.add('game', Game)
game.scene.add('instruction', Instructions)
game.scene.add('YB_winner', Winner_YB_Screen)
game.scene.add('GR_winner', Winner_GR_Screen)





