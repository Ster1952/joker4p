class InstructionScene extends Phaser.Scene {
   
   
    preload () {
        this.load.html('instructionform', 'src/scenes/instructionform.html');
        //this.load.image('title','src/images/instructions.png');
    }

    create () {
    
        //let background = this.add.sprite(645,50, 'title');
    
        let scene = this.scene;
        var element = this.add.dom(650, 405).createFromCache('instructionform');
    

        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'return')
            {
                    scene.start('titlescreen');
            } 
        });
    }
}
export default InstructionScene;