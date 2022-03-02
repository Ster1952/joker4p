import TitleScreen from './TitleScreen.js'
import Game from './Game.js'
import Instructions from './InstructionScene.js';


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

game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)
game.scene.add('instruction', Instructions)

game.scene.start('titlescreen')
//game.scene.start('game')




