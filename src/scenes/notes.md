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


 // if(colorplayed === 'green' && colororder === "yellow" && ghf && sevenplayed === '7'){
            //     self.colorsturn.text = "8888Green's moving - R"
            // }
            // else if(colorplayed === 'green' && colororder === "yellow" && rhf && phf){
            //     self.colorsturn.text = "7777Red's move"
            // }
            // else if(colorplayed === 'green' && colororder === "yellow" && rhf && phf){
            //     self.colorsturn.text = "6666Purple's moving - Y"
            // }
            // else if(colorplayed === 'green' && colororder === "yellow" && rhf && self.nextTurn === 'green'){
            //     self.colorsturn.text = "  5555Purple's move   "
            //     self.nextTurn = 'purple'
            // }
            // else if(colorplayed === 'green' && colororder === "yellow" && phf  && self.nextTurn === 'green'){
            //     self.colorsturn.text = "4444Purple's moving - Y"
            //     self.nextTurn = 'purple'
            // }
            // else if (colorplayed === 'green' && colororder === "purple" && yhf && rhf){
            //     self.colorsturn.text = "3333Purple's moving Y"
            // } 
            // else if (colorplayed === 'green' && colororder === "purple" && yhf && self.nextTurn === 'green'){
            //     self.colorsturn.text = "  2222Purple's move   "
            //     self.nextTurn = 'purple'
            // } 
            // else if (colorplayed === 'green' && colororder === "purple" && rhf && self.nextTurn === 'red'){
            //     self.colorsturn.text = "   1111Yellow's move   "
            //     self.nextTurn = 'yellow'
            // } 
            // else if (colorplayed === 'green' && colororder === "red" && rhf){
            //     self.colorsturn.text = "  999 Yellow's move   "
            // } 
            // else if(colorplayed === 'green'){
            //     self.colorsturn.text = "  888Purple's move   "
            //     self.nextTurn = 'purple'
            // }
            // else if(colorplayed === 'purple' && colororder === "green" && phf && sevenplayed === '7'){
            //     self.colorsturn.text = "777Purple moving - Y"
            // }
            // else if(colorplayed === 'purple' && colororder === "red" && yhf && ghf){
            //     self.colorsturn.text = "666Yellow's moving - P"
            // }
            // else if(colorplayed === 'purple' && colororder === "red" && yhf && self.nextTurn === "yellow"){
            //     self.colorsturn.text = "   555Green's move   "
            //     self.nextTurn = 'green'
            // }
            // else if(colorplayed === 'purple' && colororder === "red" && ghf && self.nextTurn === 'purple'){
            //     self.colorsturn.text = "    444Red's move    "
            //     self.nextTurn = 'red'
            // }
            // else if(colorplayed === 'purple' && colororder === "green" && rhf && yhf){
            //     self.colorsturn.text = " 333Red's moving - G "
            // }
            // else if(colorplayed === 'purple' && colororder === "green" && rhf && self.nextTurn === "purple"){
            //     self.colorsturn.text = " 222Red's moving - G "
            //     self.nextTurn = 'red'
            // }
            // else if(colorplayed === 'purple' && colororder === "green" && yhf && self.nextTurn === 'purple'){
            //     self.colorsturn.text = "    111Red's move    "
            //     self.nextTurn = 'red'
            // }
            // else if(colorplayed === 'purple' && colororder === "yellow" && yhf){
            //     self.colorsturn.text = "  ==Green's move  "
            // }
            // else if(colorplayed === 'purple'){
            //     self.colorsturn.text = "    99Red's move"
            //     self.nextTurn = 'red'
            // }
            // else if(colorplayed === 'red' && colororder === "purple" && rhf && sevenplayed === '7'){
            //     self.colorsturn.text = " 88Red moving - G "
            // }
            // else if(colorplayed === 'red' && colororder === "yellow" && ghf && phf && self.nextTurn === 'green'){
            //     self.colorsturn.text = "77Purple's moving - Y"
            //     self.nextTurn = 'purple'
            // }
            // else if(colorplayed === 'red' && colororder === "yellow" && ghf && self.nextTurn === 'green'){
            //     self.colorsturn.text = "   66Purple's move   "
            //     self.nextTurn = 'purple'
            // }
            // else if(colorplayed === 'red' && colororder === "yellow" && phf && self.nextTurn === 'red'){
            //     self.colorsturn.text = "   55Yellow's move   "
            //     self.nextTurn = 'yellow'
            // }
            // else if(colorplayed === 'red' && colororder === "purple" && ghf && yhf){
            //     self.colorsturn.text = "   mmm   "
            // }
            // else if(colorplayed === 'red' && colororder === "purple" && ghf && self.nextTurn === 'red'){
            //     self.colorsturn.text = "   44Yellow's move   "
            //     self.nextTurn = 'yellow'
            // }
            // else if(colorplayed === 'red' && colororder === "green" && ghf){
            //     self.colorsturn.text = "  33Purple's move  "
            // }
            // else if(colorplayed === 'red' && colororder === "purple" && yhf && self.nextTurn === 'red'){
            //     self.colorsturn.text = "22Yellow's moving - P"
            //     self.nextTurn = 'yellow'
            // }
            // else if(colorplayed === 'red'){
            //     self.colorsturn.text = "  11Yellow's move   "
            //     self.nextTurn = 'yellow'
            // }
            
            // else if(colorplayed === 'yellow' && colororder === "red" && yhf && sevenplayed === '7'){
            //     self.colorsturn.text = "Yellow moving - P"
            // }
            // // else if(colorplayed === 'yellow' && colororder === "green" && phf && rhf && previouscolor === 'green'){
            // //     self.colorsturn.text = " Red's moving - G "
            // // }
            // else if(colorplayed === 'yellow' && colororder === "green" && phf && rhf){
            //     self.colorsturn.text = " 8Red's moving - G "
            // }
            // else if(colorplayed === 'yellow' && colororder === "green" && phf  && self.nextTurn === 'purple'){
            //     self.colorsturn.text = "    7Red's move    "
            //     self.nextTurn = 'red'
            // }
            // else if(colorplayed === 'yellow' && colororder === "green" && rhf && self.nextTurn === 'yellow'){
            //     self.colorsturn.text = "   6Green's move   "
            //     self.nextTurn = 'green'
            // }
            // else if(colorplayed === 'yellow' && colororder === "red" && ghf & phf && self.nextTurn === 'yellow'){
            //     self.colorsturn.text = "5Green moving - R"
            //     self.nextTurn = 'green'
            // }
            // else if(colorplayed === 'yellow' && colororder === "red" && ghf && self.nextTurn === 'yellow'){
            //     self.colorsturn.text = "4Green's moving - R"
            //     self.nextTurn = 'green'
            // }
            // else if(colorplayed === 'yellow' && colororder === "red" && phf && self.nextTurn === 'yellow'){
            //     self.colorsturn.text = "   2Green's move   "
            //     self.nextTurn = 'green'
            // }
            // else if(colorplayed === 'yellow' && colororder === "purple" && phf){
            //     self.colorsturn.text = "   1Red's move   "
            // }
            // else if(colorplayed === 'yellow'){
            //     self.colorsturn.text = "   1Green's move   "
            //     self.nextTurn = 'green'
            // }
