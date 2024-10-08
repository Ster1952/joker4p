"use strict"
import Card from '../helpers/Cards.js'
import Dealer from '../helpers/Dealer.js'
import Zone from '../helpers/Zone.js'
export default class Game extends Phaser.Scene {

    init(data) {
        this.text = data

    }
    preload() {

        //**  note playing cards are preloaded in title scene   */

        this.load.image('background', 'src/images/sand.png')
        this.load.image('jokersign1', 'src/images/jokersign1.png')
        this.load.image('jokersign2', 'src/images/jokersign2.png')
        this.load.image('jokerhat', 'src/images/jokerhat.png')
        this.load.atlas('sphere', 'src/images/marbles.png', 'src/images/marbles.json')
    

    }

    async create() {
        let self = this
        let scene = this.scene
        this.isPlayerA = false
        this.isPlayerB = false
        this.isPlayerC = false
        this.isPlayerD = false
        this.playersHand = []
        this.hand1 = []
        this.hand2 = []
        this.hand3 = []
        this.hand4 = []
        this.deck = []
        this.previousPlayer
        this.nextTurn = ''
        this.cardsPlayedFrames = []
        this.cardsPlayedObjects = []
        this.badMove = false
        this.dealer = new Dealer(this)
        this.zone = new Zone(this)
        this.dropZone = this.zone.renderZone(1025, 375, 170, 220)
        this.markerText = self.add.text('')
        const tableID = self.text
        let waiting = true

        let nameTopPlayer = ''
        let nameBottomPlayer = ''
        let nameLeftPlayer = ''
        let nameRightPlayer = ''

        // GAME BOARD HOLES
        this.gameBoard = this.physics.add.group({ immovable: true })
        this.topMarble = this.physics.add.group()
        this.rightMarble = this.physics.add.group()
        this.bottomMarble = this.physics.add.group()
        this.leftMarble = this.physics.add.group()
        this.topHome = this.physics.add.group()
        this.rightHome = this.physics.add.group()
        this.bottomHome = this.physics.add.group()
        this.leftHome = this.physics.add.group()

        this.add.image(0, 0, 'background').setOrigin(0.0)
        this.add.image(415, 565, 'jokersign2')
        this.add.image(415, 255, 'jokersign1')
        this.add.image(170, 295, 'jokerhat').setScale(.25)
        this.add.image(655, 525, 'jokerhat').setScale(.25)
        this.outline = this.zone.renderOutline(this.dropZone)

        this.gameBoard.create(50, 90, 'sphere', 'blackdot').refreshBody().setCircle(16) // Hole 72
        this.gameBoard.create(50, 130, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(50, 170, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(50, 210, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(50, 250, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(50, 290, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(50, 330, 'sphere', 'blackdot').refreshBody().setCircle(16)

        this.gameBoard.create(50, 370, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(50, 410, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(50, 450, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(50, 490, 'sphere', 'blackdot').refreshBody().setCircle(16) // Hole 62 - RIGHT Exit
        this.gameBoard.create(50, 530, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(50, 570, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(50, 610, 'sphere', 'black').refreshBody().setCircle(16)
        // ----
        let RightHome = this.gameBoard.create(50, 650, 'sphere', 'blackdot').refreshBody().setCircle(16) // Hole 58 - RIGHT Home Area
        // ----
        this.gameBoard.create(50, 690, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(50, 730, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(50, 770, 'sphere', 'black').refreshBody().setCircle(16) //Hole 55 - Bottom left corner


        this.gameBoard.create(90, 770, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(130, 770, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(170, 770, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(210, 770, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(250, 770, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(290, 770, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(330, 770, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(370, 770, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(410, 770, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(450, 770, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(490, 770, 'sphere', 'blackdot').refreshBody().setCircle(16) // Hole 44 - BOTTOM Exit
        this.gameBoard.create(530, 770, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(570, 770, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(610, 770, 'sphere', 'black').refreshBody().setCircle(16)
        // ----
        let BottomHome = this.gameBoard.create(650, 770, 'sphere', 'blackdot').refreshBody().setCircle(16) // Hole 40 - BOTTOM Home Area
        // ----
        this.gameBoard.create(690, 770, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(730, 770, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(770, 770, 'sphere', 'black').refreshBody().setCircle(16) // Hole 37 - Bottom right cornet

        this.gameBoard.create(770, 730, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(770, 690, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(770, 650, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(770, 610, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(770, 570, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(770, 530, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(770, 490, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(770, 450, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(770, 410, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(770, 370, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(770, 330, 'sphere', 'blackdot').refreshBody().setCircle(16) // Hole 26 - LEFT Exit 
        this.gameBoard.create(770, 290, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(770, 250, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(770, 210, 'sphere', 'black').refreshBody().setCircle(16)
        // ----
        let LeftHome = this.gameBoard.create(770, 170, 'sphere', 'blackdot').refreshBody().setCircle(16) // Hole 22 - LEFT Home Area
        // ----
        this.gameBoard.create(770, 130, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(770, 90, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(770, 50, 'sphere', 'black').refreshBody().setCircle(16) // Hole 19 - Top right corner

        this.gameBoard.create(730, 50, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(690, 50, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(650, 50, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(610, 50, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(570, 50, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(530, 50, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(490, 50, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(450, 50, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(410, 50, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(370, 50, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(330, 50, 'sphere', 'blackdot').refreshBody().setCircle(16) //Hole 8 - Top Exit
        this.gameBoard.create(290, 50, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(250, 50, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(210, 50, 'sphere', 'black').refreshBody().setCircle(16)
        // ----
        let TopHome = this.gameBoard.create(170, 50, 'sphere', 'blackdot').refreshBody().setCircle(16) // Hole 4 - Top Home Area
        // ----
        this.gameBoard.create(130, 50, 'sphere', 'black').refreshBody().setCircle(16)
        this.gameBoard.create(90, 50, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(50, 50, 'sphere', 'black').refreshBody().setCircle(16) //Hole 1 - Top Left corner

        // TOP HOME
        this.topHome.create(170, 100, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.topHome.create(170, 140, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.topHome.create(170, 180, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.topHome.create(210, 180, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.topHome.create(250, 180, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(370, 100, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(370, 140, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(370, 180, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(330, 140, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(410, 140, 'sphere', 'blackdot').refreshBody().setCircle(16)

        // LEFT HOME
        this.leftHome.create(720, 170, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.leftHome.create(680, 170, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.leftHome.create(640, 170, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.leftHome.create(640, 210, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.leftHome.create(640, 250, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(710, 370, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(670, 370, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(630, 370, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(670, 330, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(670, 410, 'sphere', 'blackdot').refreshBody().setCircle(16)

        // BOTTOM HOME
        this.bottomHome.create(650, 720, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.bottomHome.create(650, 680, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.bottomHome.create(650, 640, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.bottomHome.create(610, 640, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.bottomHome.create(570, 640, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(450, 720, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(450, 680, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(450, 640, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(490, 680, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(410, 680, 'sphere', 'blackdot').refreshBody().setCircle(16)


        // RIGHT HOME
        this.rightHome.create(100, 650, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.rightHome.create(140, 650, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.rightHome.create(180, 650, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.rightHome.create(180, 610, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.rightHome.create(180, 570, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(100, 450, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(140, 450, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(180, 450, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(140, 490, 'sphere', 'blackdot').refreshBody().setCircle(16)
        this.gameBoard.create(140, 410, 'sphere', 'blackdot').refreshBody().setCircle(16)

        //PLAYER MARBLES
        // Top Marbles

        let top1 = this.topMarble.create(370, 100, 'sphere', 'green')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'top1', X: 370, Y: 100, homeX: 170, homeY: 50 })
            .setCollideWorldBounds(true)
        let top2 = this.topMarble.create(370, 140, 'sphere', 'green')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'top2', X: 370, Y: 140, homeX: 170, homeY: 50 })
            .setCollideWorldBounds(true)
        let top3 = this.topMarble.create(370, 180, 'sphere', 'green')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'top3', X: 370, Y: 180, homeX: 170, homeY: 50 })
            .setCollideWorldBounds(true)
        let top4 = this.topMarble.create(330, 140, 'sphere', 'green')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'top4', X: 330, Y: 140, homeX: 170, homeY: 50 })
            .setCollideWorldBounds(true)
        let top5 = this.topMarble.create(410, 140, 'sphere', 'green')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'top5', X: 410, Y: 140, homeX: 170, homeY: 50 })
            .setCollideWorldBounds(true)


        // Left Marbles
        let left1 = this.leftMarble.create(710, 370, 'sphere', 'blue')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'left1', X: 710, Y: 370, homeX: 770, homeY: 170 })
            .setCollideWorldBounds(true)
        let left2 = this.leftMarble.create(670, 370, 'sphere', 'blue')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'left2', X: 670, Y: 370, homeX: 770, homeY: 170 })
            .setCollideWorldBounds(true)
        let left3 = this.leftMarble.create(630, 370, 'sphere', 'blue')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'left3', X: 630, Y: 370, homeX: 770, homeY: 170 })
            .setCollideWorldBounds(true)
        let left4 = this.leftMarble.create(670, 330, 'sphere', 'blue')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'left4', X: 670, Y: 330, homeX: 770, homeY: 170 })
            .setCollideWorldBounds(true)
        let left5 = this.leftMarble.create(670, 410, 'sphere', 'blue')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'left5', X: 670, Y: 410, homeX: 770, homeY: 170 })
            .setCollideWorldBounds(true)

        // Bottom Marbles
        let bottom1 = this.bottomMarble.create(450, 720, 'sphere', 'red')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'bottom1', X: 450, Y: 720, homeX: 650, homeY: 770 })
            .setCollideWorldBounds(true)
        let bottom2 = this.bottomMarble.create(450, 680, 'sphere', 'red')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'bottom2', X: 450, Y: 680, homeX: 650, homeY: 770 })
            .setCollideWorldBounds(true)
        let bottom3 = this.bottomMarble.create(450, 640, 'sphere', 'red')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'bottom3', X: 450, Y: 640, homeX: 650, homeY: 770 })
            .setCollideWorldBounds(true)
        let bottom4 = this.bottomMarble.create(490, 680, 'sphere', 'red')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'bottom4', X: 490, Y: 680, homeX: 650, homeY: 770 })
            .setCollideWorldBounds(true)
        let bottom5 = this.bottomMarble.create(410, 680, 'sphere', 'red')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'bottom5', X: 410, Y: 680, homeX: 650, homeY: 770 })
            .setCollideWorldBounds(true)

        // Right Marbles
        let right1 = this.rightMarble.create(100, 450, 'sphere', 'yellow')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'right1', X: 100, Y: 450, homeX: 50, homeY: 650 })
            .setCollideWorldBounds(true)
        let right2 = this.rightMarble.create(140, 450, 'sphere', 'yellow')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'right2', X: 140, Y: 450, homeX: 50, homeY: 650 })
            .setCollideWorldBounds(true)
        let right3 = this.rightMarble.create(180, 450, 'sphere', 'yellow')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'right3', X: 180, Y: 450, homeX: 50, homeY: 650 })
            .setCollideWorldBounds(true)
        let right4 = this.rightMarble.create(140, 490, 'sphere', 'yellow')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'right4', X: 140, Y: 490, homeX: 50, homeY: 650 })
            .setCollideWorldBounds(true)
        let right5 = this.rightMarble.create(140, 410, 'sphere', 'yellow')
            .setInteractive({ useHandCursor: true, draggable: true })
            .setCircle(16)
            .setData({ name: 'right5', X: 140, Y: 410, homeX: 50, homeY: 650 })
            .setCollideWorldBounds(true)

        // Player colour indicators
        this.topMarble.create(290, 330, 'sphere', 'green')
        this.topMarble.create(290, 370, 'sphere', 'red')
        this.topMarble.create(290, 450, 'sphere', 'blue')
        this.topMarble.create(290, 490, 'sphere', 'yellow')

        // Circle for connected players
        let c1 = this.add.circle(975, 105, 11, 0x000000)
        let c2 = this.add.circle(1005, 105, 11, 0x000000)
        let c3 = this.add.circle(1035, 105, 11, 0x000000)
        let c4 = this.add.circle(1065, 105, 11, 0x000000)

        //console.log('tableID', tableID)

        window.addEventListener('beforeunload', ev => {
            ev.preventDefault()
            ev.returnValue = ''
        })

        // CONNECTION TO SERVER ESTABLISHED

        this.socket = io({ transports: ["websocket"] });

        while (waiting) {
            this.player_name = prompt("Please enter you first NAME. ")
            
            if (self.player_name === null){
                waiting = false
                self.socket.disconnect()
                scene.start('titlescreen')
            }
            else if (self.player_name.length > 0) {
                waiting = false
            }
        }

        self.socket.on('connect', () => {
                self.socket.emit('roominfo', tableID, self.player_name )
        
        })

        self.socket.on('disconnection_info', function (person, reason) {
            //console.log('Player ' + person + ' disconnect because ' + reason)
            self.errormsg.text = "Player " + person + " disconnected \nbecause " + reason
        })

        self.socket.on('playerWarning', function () {
            alert("This game has four players already. Please choose another Game Name")
            self.socket.disconnect()
            scene.start('titlescreen')
        })


        self.socket.on('PlayerInfo', async function (data) {
            //this shows which players are connected to the room
            console.log('Player Info data -->>',data)

            let roomsConnected = data.map(p => p.player) // produces array of rooms connected
            console.log('rooms connected', roomsConnected)

            let pp1 = roomsConnected.some(p => p === 1)
            let pp2 = roomsConnected.some(p => p === 2)
            let pp3 = roomsConnected.some(p => p === 3)
            let pp4 = roomsConnected.some(p => p === 4)

            data.forEach(id_for_Player)
            data.forEach(name_of_player)

            await new Promise(resolve => {
                self.socket.emit('connectedPlayersServer', pp1, pp2, pp3, pp4, nameTopPlayer, nameLeftPlayer,nameBottomPlayer,nameRightPlayer,
                 (ans) => { resolve(ans), console.log('ans= ', ans.status) })
            })
        

        })

        
        self.socket.on('connectedPlayers', function (p1, p2, p3, p4, topPlayer, leftPlayer, bottomPlayer, rightPlayer) {
            //console.log('connected player', p1,p2,p3,p4)
            p1 ? c1.fillColor = 0x00ff00 : c1.fillColor = 0x000000
            p2 ? c2.fillColor = 0x00ff00 : c2.fillColor = 0x000000
            p3 ? c3.fillColor = 0x00ff00 : c3.fillColor = 0x000000
            p4 ? c4.fillColor = 0x00ff00 : c4.fillColor = 0x000000
            
            p1 ? self.topContestant.text = topPlayer : self.topContestant.text = '' 
            p2 ? self.leftContestant.text = leftPlayer : self.leftContestant.text = ''
            p3 ? self.bottomContestant.text = bottomPlayer : self.bottomContestant.text = ''
            p4 ? self.rightContestant.text = rightPlayer : self.rightContestant.text = ''
            
        })

        //  ------- REMOTE PLAYERS SECTION ---------   

        self.socket.on('reset', function () {
            // console.log('reset data available', self.cardsPlayedObjects)

            self.playersHand.forEach(item => item.destroy())
            self.cardsPlayedObjects.forEach(item => item.destroy())

            self.playersHand = []
            self.cardsPlayedFrames = []
            self.cardsPlayedObjects = []
            self.deck = []
            self.markerText.setText('')

            //console.log('reset status', self.playersHand, self.cardsPlayedObjects, self.deck, self.dropZone)

            // Resets Marbles
            top1.x = 370, top1.y = 100, top2.x = 370, top2.y = 140, top3.x = 370, top3.y = 180, top4.x = 330, top4.y = 140, top5.x = 410, top5.y = 140

            left1.x = 710, left1.y = 370, left2.x = 670, left2.y = 370, left3.x = 630, left3.y = 370, left4.x = 670, left4.y = 330, left5.x = 670, left5.y = 410

            bottom1.x = 450, bottom1.y = 720, bottom2.x = 450, bottom2.y = 680, bottom3.x = 450, bottom3.y = 640, bottom4.x = 490, bottom4.y = 680, bottom5.x = 410, bottom5.y = 680

            right1.x = 100, right1.y = 450, right2.x = 140, right2.y = 450, right3.x = 180, right3.y = 450, right4.x = 140, right4.y = 490, right5.x = 140, right5.y = 410

            self.children.bringToTop(top1)
            self.children.bringToTop(top2)
            self.children.bringToTop(top3)
            self.children.bringToTop(top4)
            self.children.bringToTop(top5)

            self.children.bringToTop(left1)
            self.children.bringToTop(left2)
            self.children.bringToTop(left3)
            self.children.bringToTop(left4)
            self.children.bringToTop(left5)

            self.children.bringToTop(right1)
            self.children.bringToTop(right2)
            self.children.bringToTop(right3)
            self.children.bringToTop(right4)
            self.children.bringToTop(right5)

            self.children.bringToTop(bottom1)
            self.children.bringToTop(bottom2)
            self.children.bringToTop(bottom3)
            self.children.bringToTop(bottom4)
            self.children.bringToTop(bottom5)

            // Deal new hands to players
            self.socket.emit('dealCardsclient')

        })

        self.socket.on('syncBoard', function (h1, h2, h3, h4, deck, cardsPlayedFrames, t1, t2, t3, t4, t5, l1, l2, l3, l4, l5, b1, b2, b3, b4, b5, r1, r2, r3, r4, r5) {
            self.DealCardsButton.setText('')
            self.DealCardsButton.disableInteractive()
            self.DealCardsButton.setStyle({ backgroundColor: ' ' })
            self.DealCardsButton.setPadding(0, 0, 0, 0)
            self.hand1 = h1
            self.hand2 = h2
            self.hand3 = h3
            self.hand4 = h4
            self.deck = deck;
            let newhand = [h1, h2, h3, h4]
            self.playersHand = self.dealer.dealCards(newhand)

            let dropcard = cardsPlayedFrames[cardsPlayedFrames.length - 1]
            if (dropcard !== undefined) {
                let card = new Card(self)
                let obj = card.render(self.dropZone.x, self.dropZone.y, 'cards', dropcard).setDepth(0)
                obj.disableInteractive()
            }
            top1.x = t1.x, top1.y = t1.y, top2.x = t2.x, top2.y = t2.y, top3.x = t3.x, top3.y = t3.y, top4.x = t4.x, top4.y = t4.y, top5.x = t5.x, top5.y = t5.y
            left1.x = l1.x, left1.y = l1.y, left2.x = l2.x, left2.y = l2.y, left3.x = l3.x, left3.y = l3.y, left4.x = l4.x, left4.y = l4.y, left5.x = l5.x, left5.y = l5.y
            bottom1.x = b1.x, bottom1.y = b1.y, bottom2.x = b2.x, bottom2.y = b2.y, bottom3.x = b3.x, bottom3.y = b3.y, bottom4.x = b4.x, bottom4.y = b4.y, bottom5.x = b5.x, bottom5.y = b5.y
            right1.x = r1.x, right1.y = r1.y, right2.x = r2.x, right2.y = r2.y, right3.x = r3.x, right3.y = r3.y, right4.x = r4.x, right4.y = r4.y, right5.x = r5.x, right5.y = r5.y

        })

        self.socket.on('marker', function (posX, posY) {
            self.markerText.setText('')
            self.errormsg.setText('')
            self.markerText = self.add.text(posX - 16, posY - 22, '*', { color: 'white', fontSize: 'bold 55px' }).setInteractive()
        })

        self.socket.on('moveCompleted', function (data) {

            let lookup = {
                'left1': left1, 'left2': left2, 'left3': left3, 'left4': left4, 'left5': left5,
                'right1': right1, 'right2': right2, 'right3': right3, 'right4': right4, 'right5': right5,
                'top1': top1, 'top2': top2, 'top3': top3, 'top4': top4, 'top5': top5,
                'bottom1': bottom1, 'bottom2': bottom2, 'bottom3': bottom3, 'bottom4': bottom4, 'bottom5': bottom5
            }
            self.gameObject = lookup[data.name]
            self.children.bringToTop(self.gameObject)
            self.gameObject.x = data.dragX
            self.gameObject.y = data.dragY

        })

        self.socket.on('winners', function (data) {
            if (data === 'yb') {
                self.scene.switch('YB_winner')
            }
            else if (data === 'gr') {
                self.scene.switch('GR_winner')
            }

        })


        self.socket.on('cardPlayed', function (gameObject, playerA, playerB, playerC, playerD) {
            self.cardsPlayedFrames.push(gameObject.frameKey)
            //console.log('cards played remote player', gameObject.frameKey)
            let card = new Card(self)
            let obj = card.render(self.dropZone.x, self.dropZone.y, 'cards', gameObject.frameKey).setDepth(0)
            obj.disableInteractive()
            self.cardsPlayedObjects.push(obj)

            if (self.isPlayerA && playerA) {
                let index1 = self.hand1.indexOf(gameObject.frameKey);
                if (index1 !== -1) {
                    let card = new Card(self)
                    let deckcard1 = card.render(900 + (index1 * 50), 680, 'cards', self.deck[0]).setDepth(index1)
                    self.hand1.splice(index1, 1, deckcard1.frame.name)
                    self.playersHand.splice(index1, 1, deckcard1)
                }
            } else if (self.isPlayerB && playerB) {
                let index2 = self.hand2.indexOf(gameObject.frameKey);
                if (index2 !== -1) {
                    let card = new Card(self)
                    let deckcard2 = card.render(900 + (index2 * 50), 680, 'cards', self.deck[0]).setDepth(index2)
                    self.hand2.splice(index2, 1, deckcard2.frame.name)
                    self.playersHand.splice(index2, 1, deckcard2)
                }
            } else if (self.isPlayerC && playerC) {
                let index3 = self.hand3.indexOf(gameObject.frameKey);
                if (index3 !== -1) {
                    let card = new Card(self)
                    let deckcard3 = card.render(900 + (index3 * 50), 680, 'cards', self.deck[0]).setDepth(index3)
                    self.hand3.splice(index3, 1, deckcard3.frame.name)
                    self.playersHand.splice(index3, 1, deckcard3)
                }
            } else if (self.isPlayerD && playerD) {
                let index4 = self.hand4.indexOf(gameObject.frameKey);
                if (index4 !== -1) {
                    let card = new Card(self)
                    let deckcard4 = card.render(900 + (index4 * 50), 680, 'cards', self.deck[0]).setDepth(index4)
                    self.hand4.splice(index4, 1, deckcard4.frame.name)
                    self.playersHand.splice(index4, 1, deckcard4)
                }
            }

            self.deck.shift()

            if (self.cardsPlayedFrames.length === 84) {
                self.deck = Phaser.Utils.Array.Shuffle(self.cardsPlayedFrames)
                self.cardsPlayedFrames = []
            }
        })

        self.socket.on('colormoved', function (colorplayed) {
            //console.log('colormoved', colorplayed, self.cardsPlayedFrames)
            let ghf = homefull(top1, top2, top3, top4, top5, self.topHome)
            let yhf = homefull(right1, right2, right3, right4, right5, self.rightHome)
            let rhf = homefull(bottom1, bottom2, bottom3, bottom4, bottom5, self.bottomHome)
            let bhf = homefull(left1, left2, left3, left4, left5, self.leftHome)

            self.previousPlayer = colorplayed
            if (colorplayed === 'green' && bhf) {
                self.colorsturn.text = "Blue's moving - Y"
            }
            else if (colorplayed === 'green') {
                self.colorsturn.text = "    Blue's move    "
            }
            else if (colorplayed === 'blue' && rhf) {
                self.colorsturn.text = " Red's moving - G "
            }
            else if (colorplayed === 'blue') {
                self.colorsturn.text = "    Red's move    "
            }
            else if (colorplayed === 'red' && yhf) {
                self.colorsturn.text = "Yellow's moving - B"
            }
            else if (colorplayed === 'red') {
                self.colorsturn.text = "   Yellow's move   "
            }
            else if (colorplayed === 'yellow' && ghf) {
                self.colorsturn.text = "Green's moving - R"
            }
            else if (colorplayed === 'yellow') {
                self.colorsturn.text = "   Green's move   "
            }
        })


        self.socket.on('dealCards', function (hand) {
            self.hand1 = hand[0]
            self.hand2 = hand[1]
            self.hand3 = hand[2]
            self.hand4 = hand[3]
            self.deck = hand[4]
            self.playersHand = self.dealer.dealCards(hand)
            self.DealCardsButton.setText('')
            self.DealCardsButton.disableInteractive()
            self.DealCardsButton.setStyle({ backgroundColor: ' ' })
            self.DealCardsButton.setPadding(0, 0, 0, 0)
        })

        // -------- LOCAL PLAYER SECTION -----------

        this.errormsg = this.add.text(940, 500, '', { font: "18px Arial", fill: "05ffa1" })
        this.topContestant = this.add.text(320 ,315, '',{fontSize: "bold 32px", fill: "05ffa1"})
        this.bottomContestant = this.add.text(320,355, '',{fontSize: "bold 32px", fill: "05ffa1"})
        this.leftContestant = this.add.text(320,435, '',{fontSize: "bold 32px", fill: "05ffa1"})
        this.rightContestant = this.add.text(320,475, '',{fontSize: "Bold 32px", fill: "05ffa1"})

        this.resetGame = this.add.text(964, 40, 'New Game', { fontSize: 'bold 24px' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => self.socket.emit('resetclient'))
            .on('pointerover', () => this.resetGame.setStyle({ fill: '#ff0000' }))
            .on('pointerout', () => this.resetGame.setStyle({ fill: '#ffffff' }))

        this.colorsturn = this.add.text(870, 190, '', { fontSize: 'bold 30px', color: 'black' })

        this.DealCardsButton = this.add.text(945, 520, 'Deal Cards', { fontSize: 'bold 24px' })
            .setPadding(7)
            .setStyle({ backgroundColor: '#FF' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => self.socket.emit('dealCardsclient'))
            .on('pointerover', () => this.DealCardsButton.setStyle({ fill: '#00ff00' }))
            .on('pointerout', () => this.DealCardsButton.setStyle({ fill: '#ffffff' }))

        this.syncGame = this.add.text(971, 140, 'Recover', { fontSize: 24 })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.syncGame.setStyle({ fill: '#ff0000' }))
            .on('pointerout', () => this.syncGame.setStyle({ fill: '#ffffff' }))

        this.syncGame.on('pointerdown', function () {
            let resyncboard = confirm("Press the OK button if you wish to help a missing player recover their game data. Note the missing player should not use this feature.")
            if (resyncboard === true) {

                self.socket.emit('sync_client', self.hand1, self.hand2, self.hand3, self.hand4, self.deck, self.cardsPlayedFrames, top1, top2, top3, top4, top5,
                    left1, left2, left3, left4, left5, bottom1, bottom2, bottom3, bottom4, bottom5, right1, right2, right3, right4, right5)
            } else {
                return false
            }
        }, this)

        this.input.on('dragstart', function (pointer, gameObject) {
            if (gameObject.type === "Sprite") {
                self.markerText.setText('')
                self.errormsg.setText('')
                self.markerText = self.add.text(gameObject.x - 16, gameObject.y - 22, '*', { color: 'white', fontSize: 'bold 55px' }).setInteractive()
                this.children.bringToTop(gameObject)
                self.socket.emit('markerclient', gameObject.x, gameObject.y)
            } else {
                this.children.bringToTop(gameObject)
            }
        }, this)

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            // console.log('drag', gameObject.type)
            gameObject.x = dragX;
            gameObject.y = dragY;
            if (gameObject.type === "Sprite") {
                let data = { name: gameObject.data.list.name, dragX: gameObject.x, dragY: gameObject.y }
                self.socket.emit('moveCompletedclient', data)
            }
        }, this)

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            // Check to see if marble is dropped in the dropZone
            if (gameObject.type === "Image") {
                gameObject.x = dropZone.x
                gameObject.y = dropZone.y
                gameObject.input.enabled = false
                self.socket.emit('cardPlayedclient', gameObject, self.isPlayerA, self.isPlayerB, self.isPlayerC, self.isPlayerD)
                gameObject.destroy() // If card in dropZone not destroyed we get two cards being played in dropZone
            }
        }, this)

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            self.badMove = false
            if (!dropped && gameObject.type === "Image") {
                // this will move card back to original position
                if (self.isPlayerA) {
                    let pos1 = self.hand1.indexOf(gameObject.frame.name)
                    if (pos1 !== -1) {
                        gameObject.setDepth(pos1)
                    }
                } else if (self.isPlayerB) {
                    let pos2 = self.hand2.indexOf(gameObject.frame.name)
                    if (pos2 !== -1) {
                        gameObject.setDepth(pos2)
                    }
                } else if (self.isPlayerC) {
                    let pos3 = self.hand3.indexOf(gameObject.frame.name)
                    if (pos3 !== -1) {
                        gameObject.setDepth(pos3)
                    }
                } else if (self.isPlayerD) {
                    let pos4 = self.hand4.indexOf(gameObject.frame.name)
                    if (pos4 !== -1) {
                        gameObject.setDepth(pos4)
                    }
                }
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            } else {

                self.physics.world.overlap(gameObject, self.leftMarble, oMarble)    // gameObject overlays Blue marble
                self.physics.world.overlap(gameObject, self.rightMarble, yMarble)   // gameObject overlays Yellow marble
                self.physics.world.overlap(gameObject, self.bottomMarble, rMarble)  // gameObject overlays Red marble
                self.physics.world.overlap(gameObject, self.topMarble, gMarble)     // gameObject overlays Green marble

                //console.log('bad move flag', self.badMove)
                if (!self.badMove) {
                    self.physics.world.overlap(gameObject, [self.gameBoard, self.topHome, self.bottomHome, self.leftHome, self.rightHome], board)
                    self.badMove = false
                    let ghf = homefull(top1, top2, top3, top4, top5, self.topHome)
                    let yhf = homefull(right1, right2, right3, right4, right5, self.rightHome)
                    let rhf = homefull(bottom1, bottom2, bottom3, bottom4, bottom5, self.bottomHome)
                    let bhf = homefull(left1, left2, left3, left4, left5, self.leftHome)

                    if (ghf && rhf) {
                        let winner = 'gr'
                        self.socket.emit('winner', winner)
                    }
                    if (yhf && bhf) {
                        let winner = 'yb'
                        self.socket.emit('winner', winner)
                    }

                    if (gameObject.frame.name === 'green' && rhf && bhf && self.previousPlayer === 'blue') {
                        colorsTurn('red')
                    } else if (gameObject.frame.name === 'green' && rhf && self.previousPlayer === 'red') {
                        colorsTurn('red')
                    } else if (gameObject.frame.name === 'green' && rhf && self.previousPlayer === 'blue') {
                        colorsTurn('red')
                    } else if (gameObject.frame.name === 'green') {
                        colorsTurn('green')
                    } else if (gameObject.frame.name === 'blue' && yhf && rhf && self.previousPlayer === 'red') {
                        colorsTurn('yellow')
                    } else if (gameObject.frame.name === 'blue' && yhf && self.previousPlayer === 'yellow') {
                        colorsTurn('yellow')
                    } else if (gameObject.frame.name === 'blue' && yhf && self.previousPlayer === 'red') {
                        colorsTurn('yellow')
                    } else if (gameObject.frame.name === 'blue') {
                        colorsTurn('blue')
                    } else if (gameObject.frame.name === 'red' && ghf && yhf && self.previousPlayer === 'yellow') {
                        colorsTurn('green')
                    } else if (gameObject.frame.name === 'red' && ghf && self.previousPlayer === 'green') {
                        colorsTurn('green')
                    } else if (gameObject.frame.name === 'red' && ghf && self.previousPlayer === 'yellow') {
                        colorsTurn('green')
                    } else if (gameObject.frame.name === 'red') {
                        colorsTurn('red')
                    } else if (gameObject.frame.name === 'yellow' && bhf && ghf && self.previousPlayer === 'green') {
                        colorsTurn('blue')
                    } else if (gameObject.frame.name === 'yellow' && bhf && self.previousPlayer === 'blue') {
                        colorsTurn('blue')
                    } else if (gameObject.frame.name === 'yellow' && bhf && self.previousPlayer === 'green') {
                        colorsTurn('blue')
                    } else if (gameObject.frame.name === 'yellow') {
                        colorsTurn('yellow')
                    } else {
                        return false;
                    }


                } else {
                    let data = { name: gameObject.data.list.name, dragX: gameObject.x, dragY: gameObject.y }
                    self.socket.emit('moveCompletedclient', data)

                }
            }

        }, this)

        this.input.on('gameobjectover', function (pointer, gameObject) {
            if (gameObject.type === "Image") {
                gameObject.setTint(0x7878ff)
            }
        }, this)
        this.input.on('gameobjectout', function (pointer, gameObject) {
            if (gameObject.type === "Image") {
                gameObject.clearTint()
            }
        }, this)
        // ----- FUNCTION SECTION --------

        //** Checks to see if home is full of not */
        function homefull(x1, x2, x3, x4, x5, Home) {
            let p1 = self.physics.world.overlap(x1, Home)
            let p2 = self.physics.world.overlap(x2, Home)
            let p3 = self.physics.world.overlap(x3, Home)
            let p4 = self.physics.world.overlap(x4, Home)
            let p5 = self.physics.world.overlap(x5, Home)
            if (p1 && p2 && p3 && p4 && p5) {
                return true
            } else {
                return false
            }
        }


        //** Snaps game marble in place when dropped slight of the holw */
        function board(obj, lm) {
            // Game marble overlays blackdot Hole or Black Hole (aligns game marble with hole on the board)
            //console.log('--------board------', obj.frame.name, lm.frame.name,lm.x,lm.y)

            if ((obj.frame.name === 'green' || obj.frame.name === 'red' || obj.frame.name === 'blue' || obj.frame.name === 'yellow') &&
                (lm.frame.name === "blackdot" || lm.frame.name === "black")) {
                self.gameObject = obj
                self.children.bringToTop(self.gameObject)
                self.gameObject.x = lm.x
                self.gameObject.y = lm.y
                let data = { name: obj.data.list.name, dragX: obj.x, dragY: obj.y }
                self.socket.emit('moveCompletedclient', data)
            }

        }



        function rMarble(item, group) {
            // console.log('---rMarble actived ---', item.frame.name, group.frame.name)
            let rh_occupied_with_red = self.physics.world.overlap(self.bottomMarble, BottomHome)  // Red home entrance is occupied with red marble
            let rh_occupied_with_green = self.physics.world.overlap(self.topMarble, BottomHome) // Red home is ocuppied with a green marble
            let gh_occupied_with_red = self.physics.world.overlap(self.bottomMarble, TopHome) // Green home is occupied with a red marble
            let gh_occupied_with_green = self.physics.world.overlap(self.topMarble, TopHome)  // Green home entrance is occupied with green marble
            let rh_occupied_with_yellow = self.physics.world.overlap(self.leftMarble, BottomHome) // Red home entrance is occupied with yellow marble
            let rh_occupied_with_blue = self.physics.world.overlap(self.rightMarble, BottomHome)// Red home entrance is occupied with blue marble
            console.log('rMarble overlap', rh_occupied_with_green,rh_occupied_with_red)
            //Invalid move - same colour overlaps same colour (move back to origin)
            if (item.frame.name === group.frame.name) {
                // console.log('bad move found colour on colour', item.data.values.name, item.input.dragStartX)
                reduceSteps(item)
            }
            //Invalid move - can't move green marble onto red marble as red home entrance is already occupied with a red marble
            else if (item.frame.name === 'green' && rh_occupied_with_red && group.frame.name === "red") {
                alert("INVALID MOVE - Red Home entrance is occupied with a RED Marble.")
                reduceSteps(item)
            }
            //Invalid move - can't move green marble onto red marble as red home entrance is occupied by green marble
            else if (item.frame.name === 'green' && gh_occupied_with_red && rh_occupied_with_green && group.frame.name === "red") {
                alert("INVALID MOVE - Green Home entrance is blocked as Green marble at Red Home entrance is also block by Red marble at the Green Home entrance.")
                reduceSteps(item)
            }

            //Invalid move - can't move green marble onto red marble as green home entrance and red home are already occupied green marbles
            else if (item.frame.name === 'green' && gh_occupied_with_green && rh_occupied_with_green && group.frame.name === "red") {
                alert("INVALID MOVE - Green Home entrance and Red Home entrance are both occupied with GREEN Marbles.")
                reduceSteps(item)
            }

            // Green overlays Partner's Red  ---> moves partner's red home
            else if (item.frame.name === "green" && group.frame.name === "red") {
                // Check to see if red home is occupied, if so move marble
                if (rh_occupied_with_green) {
                    self.physics.world.overlap(self.topMarble, BottomHome, move_partners_Marble)
                    self.physics.world.overlap(self.rightMarble, TopHome, move_opponets_Marble)
                    self.physics.world.overlap(self.leftMarble, TopHome, move_opponets_Marble)
                }
                else if (rh_occupied_with_blue) {
                    self.physics.world.overlap(self.rightMarble, BottomHome, move_opponets_Marble)
                }
                else if (rh_occupied_with_yellow) {
                    self.physics.world.overlap(self.leftMarble, BottomHome, move_opponets_Marble)
                }
                codeBlockHome(group)

            }
            // Blue or Yellow overlays Red
            else if ((item.frame.name === "blue" || item.frame.name === "yellow") && (group.frame.name === "red")) {
                codeBlockXY(group)
            }
            // Red overlays Green


        }

        function gMarble(item, group) {
            //console.log('---gMarble actived ---', item.frame.name, group.frame.name)
            let rh_occupied_with_red = self.physics.world.overlap(self.bottomMarble, BottomHome)  // Red home entrance is occupied with red marble
            let gh_occupied_with_red = self.physics.world.overlap(self.bottomMarble, TopHome) // Green home is occupied with a red marble
            let rh_occupied_with_green = self.physics.world.overlap(self.topMarble, BottomHome) // Red home is ocuppied with a green marble
            let gh_occupied_with_green = self.physics.world.overlap(self.topMarble, TopHome)  // Green home entrance is occupied with green marble
            let gh_occupied_with_blue = self.physics.world.overlap(self.rightMarble, TopHome) // Green home entrance is occupied by blue marble
            let gh_occupied_with_yellow = self.physics.world.overlap(self.leftMarble, TopHome) // Green home entrance is occupied by yellow marble

            //Invalid move - same colour overlaps same colour (move back to origin)
            if (item.frame.name === group.frame.name) {
                //  console.log('bad move found colour on colour', item.data.values.name, item.input.dragStartX)
                reduceSteps(item)
            }
            //Invalid move - can't move red marble onto green marble as green home entrance is already occupied with a green marble
            else if (item.frame.name === 'red' && gh_occupied_with_green && group.frame.name === "green") {
                alert("INVALID MOVE - Green Home entrance is occupied with a GREEN Marble.")
                reduceSteps(item)
            }
            //Invalid move - can't move red marble onto green marble as green home entrance is occupied by red marble
            else if (item.frame.name === 'red' && gh_occupied_with_red && rh_occupied_with_green && group.frame.name === "green") {
                alert("INVALID MOVE - Red Home entrance is blocked as Red marble at Green Home entrance is also block by Green marble at the Red Home entrance.")
                reduceSteps(item)
            }
            //Invalid move - can't move red marble onto green marble as red home entrance and green home are already occupied red marbles
            else if (item.frame.name === 'red' && gh_occupied_with_red && rh_occupied_with_red && group.frame.name === "green") {
                alert("INVALID MOVE - Green Home entrance and Red Home entrance are both occupied with Red Marbles.")
                reduceSteps(item)
            }
            // Red overlays Parter's Green  ---> moves partner's green home
            else if (item.frame.name === "red" && group.frame.name === "green") {
                // Check to see if green home is occupied, if so move marble
                if (gh_occupied_with_red) {
                    // console.log('gh occupied with red marble')
                    self.physics.world.overlap(self.bottomMarble, TopHome, move_partners_Marble)
                    self.physics.world.overlap(self.rightMarble, BottomHome, move_opponets_Marble)
                    self.physics.world.overlap(self.leftMarble, BottomHome, move_opponets_Marble)
                }
                else if (gh_occupied_with_blue) {
                    //console.log('gh occupied with blue marble')
                    self.physics.world.overlap(self.rightMarble, TopHome, move_opponets_Marble)
                }
                else if (gh_occupied_with_yellow) {
                    // console.log('gh occupied with yellow marble')
                    self.physics.world.overlap(self.leftMarble, TopHome, move_opponets_Marble)
                }
                codeBlockHome(group)
            }

            // Blue or Yellow overlays Green 
            else if ((item.frame.name === "blue" || item.frame.name === "yellow") && (group.frame.name === "green")) {
                codeBlockXY(group)
            }

            //
        }

        function oMarble(item, group) {
            // console.log('---oMarble actived ---', item.frame.name, group.frame.name)
            let oh_occupied_with_blue = self.physics.world.overlap(self.leftMarble, LeftHome)  //Blue home entrance is occupied with a blue marble
            let yh_occupied_with_yellow = self.physics.world.overlap(self.rightMarble, RightHome)  //Yellow home entrance is occupied with a yellow marble
            let oh_occupied_with_yellow = self.physics.world.overlap(self.rightMarble, LeftHome) // Blue home is occuppied with a yellow marble
            let yh_occupied_with_blue = self.physics.world.overlap(self.leftMarble, RightHome) // Yellow home is ocuppied with a blue marble 
            let oh_occupied_with_green = self.physics.world.overlap(self.topMarble, LeftHome) // Blue home is ocuppied with a green marble 
            let oh_occupied_with_red = self.physics.world.overlap(self.bottomMarble, LeftHome) // Blue home is ocuppied with a green marble 


            //Invalid move - same colour overlaps same colour (move back to origin)
            if (item.frame.name === group.frame.name) {
                // console.log('bad move found colour on colour', item.data.values.name, item.input.dragStartX)
                reduceSteps(item)
            }
            //Invalid move - can't move yellow marble onto blue marble as blue home entrance is already occupied with a blue marble
            else if (item.frame.name === 'yellow' && oh_occupied_with_blue && group.frame.name === "blue") {
                alert("INVALID MOVE - Blue Home entrance is occupied with a BLUE Marble.")
                reduceSteps(item)
            }
            else if (item.frame.name === 'yellow' && yh_occupied_with_blue && oh_occupied_with_yellow && group.frame.name === "blue") {
                alert("INVALID MOVE - Yellow Home entrance is blocked as Yellow marble at Blue Home entrance is also block by blue marble at the Yellow Home entrance.")
                reduceSteps(item)
            }
            //Invalid move - can't move yellow marble onto blue marble as blue home entrance and yellow home are already occupied yellow marbles
            else if (item.frame.name === 'yellow' && yh_occupied_with_yellow && oh_occupied_with_yellow && group.frame.name === "blue") {
                alert("INVALID MOVE - Blue Home entrance and Yellow Home entrance are both occupied with Yellow Marbles.")
                reduceSteps(item)
            }
            // Yellow overlays Partner's Blue ---> moves partner's blue home
            else if (item.frame.name === "yellow" && group.frame.name === "blue") {
                // Check to see if yellow home is occupied, if so move marble
                if (oh_occupied_with_yellow) {
                    self.physics.world.overlap(self.rightMarble, LeftHome, move_partners_Marble)
                    self.physics.world.overlap(self.topMarble, RightHome, move_opponets_Marble)
                    self.physics.world.overlap(self.bottomMarble, RightHome, move_opponets_Marble)
                }
                else if (oh_occupied_with_green) {
                    self.physics.world.overlap(self.topMarble, LeftHome, move_opponets_Marble)
                }
                else if (oh_occupied_with_red) {
                    self.physics.world.overlap(self.bottomMarble, LeftHome, move_opponets_Marble)
                }
                codeBlockHome(group)
            }
            //Green or Red overlays Blue
            else if ((item.frame.name === "green" || item.frame.name === "red") && group.frame.name === "blue") {
                // console.log('green or red active')
               codeBlockXY(group)
            }


        }

        function yMarble(item, group) {
            //console.log('---yMarble actived ---', item.frame.name, group.frame.name)
            let oh_occupied_with_blue = self.physics.world.overlap(self.leftMarble, LeftHome)  //Blue home entrance is occupied with a blue marble
            let yh_occupied_with_yellow = self.physics.world.overlap(self.rightMarble, RightHome)  //Yellow home entrance is occupied with a yellow marble
            let oh_occupied_with_yellow = self.physics.world.overlap(self.rightMarble, LeftHome) // Blue home is occuppied with a yellow marble
            let yh_occupied_with_blue = self.physics.world.overlap(self.leftMarble, RightHome) // Yellow home is ocuppied with a blue marble 
            let yh_occupied_with_green = self.physics.world.overlap(self.topMarble, RightHome)  // Yellow home is occupied with a green marble
            let yh_occupied_with_red = self.physics.world.overlap(self.bottomMarble, RightHome)  // Yellow home is occupied with a red marble

            //Invalid move - same colour overlaps same colour (move back to origin)
            if (item.frame.name === group.frame.name) {
                //console.log('bad move found colour on colour', item.data.values.name, item.input.dragStartX)
                reduceSteps(item)
            }

            //Invalid move - can't move blue marble onto yellow marble as yellow home entrance is already occupied with a yellow marble
            else if (item.frame.name === 'blue' && yh_occupied_with_yellow && group.frame.name === "yellow") {
                alert("INVALID MOVE - Yellow Home entrance is occupied with a YELLOW Marble.")
                reduceSteps(item)
            }

            //Invalid move - can't move blue marble onto yellow marble as yellow home entrance is occupied by red marble
            else if (item.frame.name === 'blue' && yh_occupied_with_blue && oh_occupied_with_yellow && group.frame.name === "yellow") {
                alert("INVALID MOVE - Blue Home entrance is blocked as the blue marble at Yellow Home entrance is also block by blue marble at the Blue Home entrance.")
                reduceSteps(item)
            }
            //Invalid move - can't move blue marble onto yellow marble as blue home entrance and yellow home are already occupied by blue marbles
            else if (item.frame.name === 'blue' && yh_occupied_with_blue && oh_occupied_with_blue && group.frame.name === "yellow") {
                alert("INVALID MOVE - Blue Home entrance and Yellow Home entrance are both occupied with Blue Marble.")
                reduceSteps(item)
            }

            // Blue overlays Partner's Yellow  ---> movers partner's yellow homw
            else if (item.frame.name === "blue" && group.frame.name === "yellow") {
                // Check to see if blue home is occupied, if so move marble
                if (yh_occupied_with_blue) {
                    self.physics.world.overlap(self.leftMarble, RightHome, move_partners_Marble)
                    self.physics.world.overlap(self.topMarble, LeftHome, move_opponets_Marble)
                    self.physics.world.overlap(self.bottomMarble, LeftHome, move_opponets_Marble)
                }
                else if (yh_occupied_with_green) {
                    self.physics.world.overlap(self.topMarble, RightHome, move_opponets_Marble)
                }
                else if (yh_occupied_with_red) {
                    self.physics.world.overlap(self.bottomMarble, RightHome, move_opponets_Marble)
                }
                codeBlockHome(group)

            }
            //Green or Red overlays Yellow
            else if ((item.frame.name === "green" || item.frame.name === "red") && group.frame.name === "yellow") {
                codeBlockXY(group)
            }

        }

        function codeBlockHome(gp){
            self.gameObject = gp
                self.children.bringToTop(self.gameObject)
                self.gameObject.x = gp.data.values.homeX
                self.gameObject.y = gp.data.values.homeY
                self.badMove = false
                let data = { name: gp.data.list.name, dragX: gp.x, dragY: gp.y }
                self.socket.emit('moveCompletedclient', data)
        }

        function codeBlockXY(gp) {
            console.log('codeBlock activated')
            self.gameObject = gp
            self.children.bringToTop(self.gameObject)
            self.gameObject.x = gp.data.values.X
            self.gameObject.y = gp.data.values.Y
            self.badMove = false
            let data = { name: gp.data.list.name, dragX: gp.x, dragY: gp.y }
            self.socket.emit('moveCompletedclient', data)
        }

        function reduceSteps(data) {
            self.gameObject = data
            self.children.bringToTop(self.gameObject)
            self.gameObject.x = data.input.dragStartX
            self.gameObject.y = data.input.dragStartY
            self.badMove = true
        }

        function move_partners_Marble(item, group) {
            //console.log('move partner marble ', group.data.list.name)
            group.x = group.data.values.homeX
            group.y = group.data.values.homeY
            let data = { name: group.data.list.name, dragX: group.x, dragY: group.y }
            self.socket.emit('moveCompletedclient', data)
        }

        function move_opponets_Marble(item, group) {
            // console.log('move opponets marble ', group.data.list.name)
            group.x = group.data.values.X
            group.y = group.data.values.Y
            let data = { name: group.data.list.name, dragX: group.x, dragY: group.y }
            self.socket.emit('moveCompletedclient', data)
        }

        async function colorsTurn(colour){
            await new Promise(resolve => {
                self.socket.emit('colormovedclient', colour,
                (ans)=> {resolve(ans), console.log('ans= ', ans.status)})
            })
        }


        function name_of_player(e){

            if (e.player === 1) { nameTopPlayer = e.playername } 
            if (e.player === 2) { nameLeftPlayer = e.playername } 
            if (e.player === 3) { nameBottomPlayer = e.playername } 
            if (e.player === 4) { nameRightPlayer = e.playername } 
        }

        function id_for_Player (element){
            let playersnumber = 0;
            if (element.playername === self.player_name){
                playersnumber = element.player; 
            };
            if (playersnumber === 1) {
                self.isPlayerA = true
                console.log('isPlayerA')
            }
            if (playersnumber === 2) {
                self.isPlayerB = true
                console.log('isPlayerB')
            }
            if (playersnumber === 3) {
                self.isPlayerC = true
                console.log('isPlayerC')
            }
            if (playersnumber === 4) {
                self.isPlayerD = true
                console.log('isPlayerD')
            }
        }


    }
    update() {



    }
}
