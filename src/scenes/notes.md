 this.startButton = this.add.text(300, 300, 'Deal Cards',{fontSize: 24})
    .setOrigin(0.5)
    .setPadding(20)
    .setStyle({ backgroundColor: '#00FF00'})
    .setInteractive({ useHandCursor: true})
    .on('pointerdown', startGame)
    .on('pointerover', () => this.startButton.setStyle({fill: '#ff0000',backgroundColor: '#00FFF0'}))
    .on('pointerout', () => this.startButton.setStyle({fill: '#ffffff', backgroundColor: '#00FF00'}))


Note: startGame above calls to a function

https://resizing.app/features/resize-png/


            