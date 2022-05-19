"use strict"

export default class TitleScreen extends Phaser.Scene {

    preload() {
        this.load.html('nameform', 'src/scenes/nameform.html')
        this.load.image('bg', 'src/images/shiny-metal.jpg')
        this.load.image('sign', 'src/images/joker4p.png')
        this.load.atlas('cards', 'src/images/cards.png', 'src/images/cards.json');



    }

    create() {

        let data = '';
        let scene = this.scene;

        this.add.image(0, 0, "bg").setOrigin(0.0)
        this.add.image(635, 100, 'sign')
        this.add.text(420, 200, "Please enter a Game Name below.\nThen click on Let's Play button", { color: 'black', fontSize: 'bold 25px' })
        this.add.text(580, 780, "Version 2.0", { color: 'black', fontSize: 'bold 15px' })

        let card1 = this.add.sprite(600, 400, 'cards', 'bj' );
        let card2 = this.add.sprite(620, 400, 'cards', 'bj' );
        let card3 = this.add.sprite(640, 400, 'cards', 'bj' );
        let card4 = this.add.sprite(660, 400, 'cards', 'bj' );
        card1.rotation = -0.5;
        card2.rotation = -0.25;
        card3.rotation = .25;
        card4.rotation = .5;

        const element = this.add.dom(630, 650).createFromCache('nameform')

        element.addListener('click');
        element.on('click', function (event) {
            if (event.target.name === 'playButton') {
                var inputText = this.getChildByName('nameField');
                if (inputText.value !== "") {
                    data = inputText.value
                    scene.start('game', data)
                }
            }
            if (event.target.name === 'instruct') {
                scene.start('instruction')
            }
        })
        
        this.input.keyboard.on('keydown-ENTER', function (event) {

            var inputVal = element.getChildByName('nameField');
            if (inputVal.value !== '') {
                data = inputVal.value;
                scene.start('game', data);
            }

        })




    }
}
