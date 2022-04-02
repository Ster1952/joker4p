"use strict"

class Winner_YB_Screen extends Phaser.Scene {


    preload() { 
    
        this.load.image('congra', 'src/images/congra.png')
        this.load.image('bword', 'src/images/blueword.png')
        this.load.image('yword', 'src/images/yellowword.png')
        this.load.image('and', 'src/images/and.png')
        this.load.image('youwin', 'src/images/youwin.png')
        this.load.image('backing2','src/images/ribbion.webp')
        
    }

    create() {
        
        this.add.image(0,0,'backing2').setOrigin(0,0)
        this.add.image(630,100,'congra')
        this.add.image(450,300,'yword')
        this.add.image(680,300,'and')
        this.add.image(860,300,'bword')
        this.add.image(630,700, 'youwin')
        let card1 = this.add.sprite(600, 500, 'cards', 'bj' );
        let card2 = this.add.sprite(620, 500, 'cards', 'bj' );
        let card3 = this.add.sprite(640, 500, 'cards', 'bj' );
        let card4 = this.add.sprite(660, 500, 'cards', 'bj' );
        card1.rotation = -0.5;
        card2.rotation = -0.25;
        card3.rotation = .25;
        card4.rotation = .5;

        this.over = this.add.text(1200,750, 'X', { fontSize: 'bold 30px', color: 'white' }).setInteractive({ useHandCursor: true })
        
        this.input.on('pointerdown', () => {
            this.input.stopPropagation()
            this.scene.switch('game')

        })
    }
}
export default Winner_YB_Screen