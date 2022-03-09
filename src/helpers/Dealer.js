import Card from './Cards.js';

export default class Dealer {
    constructor(scene) {
        this.dealCards = (hands) => {
            let playerSprite;
            let localHand = [];
            if (scene.isPlayerA) {
                 playerSprite = hands[0];
            } 
            if (scene.isPlayerB) {
                playerSprite = hands[1];
            }
            if (scene.isPlayerC) {
                playerSprite = hands[2];
           } 
            if (scene.isPlayerD) {
               playerSprite = hands[3];
           }
        
            for (let i = 0; i < 6; i++) {
                let playerCard = new Card(scene);
                let objt = playerCard.render(900 + (i * 50), 680, 'cards', playerSprite[i]).setDepth(i)
                localHand.push(objt); 
            }
            return localHand;
       }
    }
}
