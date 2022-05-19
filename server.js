const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const options = {
    transports: ["websocket"],
    allowUpgrades: false,
    pingInterval: 30000,
    pingTimeout: 60000,
    cookie: false
}
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, options);

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

const PORT = process.env.PORT || 5056;
let rooms = [];

//*** beginning of socket connection */
io.on('connection', async (socket) => {
    console.log('A user connected: ' + socket.id);
    socket.on('roominfo', (room, name_of_player_connecting) => {

        socket.join(room)
        const clients = socket.adapter.rooms.get(room);
        let players_num = clients.size;
        //console.log('client size', players_num)
        if (clients.size === 1) {
            rooms.push({ gameName: room, connectionID: socket.id, player: players_num, playername: name_of_player_connecting })
        }

        let roomsattached = rooms.filter(p => p.gameName === room);
        //console.log('roomsattached', roomsattached)
        if (roomsattached.length > 0 && clients.size > 1) {
            let check_for_player1 = roomsattached.some(p => p.player === 1)
            let check_for_player2 = roomsattached.some(p => p.player === 2)
            let check_for_player3 = roomsattached.some(p => p.player === 3)
            let check_for_player4 = roomsattached.some(p => p.player === 4)
            if (!check_for_player1) {
                players_num = 1;
                rooms.push({ gameName: room, connectionID: socket.id, player: players_num, playername: name_of_player_connecting })
            }
            else if (!check_for_player2) {
                players_num = 2;
                rooms.push({ gameName: room, connectionID: socket.id, player: players_num, playername: name_of_player_connecting })
            }
            else if (!check_for_player3) {
                players_num = 3;
                rooms.push({ gameName: room, connectionID: socket.id, player: players_num, playername: name_of_player_connecting })
            }
            else if (!check_for_player4) {
                players_num = 4;
                rooms.push({ gameName: room, connectionID: socket.id, player: players_num, playername: name_of_player_connecting })
            }

            //console.log('test results', check_for_player1, check_for_player2, check_for_player3, check_for_player4)
        }

        const numClients = clients ? clients.size : 0;
        if (numClients > 4) {
            io.to(socket.id).emit('playerWarning')
            rooms.push({ gameName: room, connectionID: socket.id, player: 5, playername: name_of_player_connecting })
        }
        let roomsConnected = rooms.filter(p => p.gameName === room)
        //console.log('rooms connected to a particler game name', roomsConnected)
        io.to(socket.id).emit('PlayerInfo', roomsConnected)

        socket.on('connectedPlayersServer', function (p1, p2, p3, p4, top, left, bottom, right, callback) {
            callback({
                status: 'successful'
            });
            io.to(room).emit('connectedPlayers', p1, p2, p3, p4, top, left, bottom, right)
        })

        socket.on('markerclient', function (posX, posY) {
            socket.to(room).emit('marker', posX, posY)
        })

        socket.on('moveCompletedclient', (data) => {
            socket.to(room).emit('moveCompleted', data)
        })

        socket.on('winner', (data) => {
            console.log('winner', data)
            io.in(room).emit('winners', data)
        })

        socket.on('dealCardsclient', () => {
            // console.log('hands',hands)
            let hands = createHands()
            io.in(room).emit('dealCards', hands) // to all clients in the same room
        })

        socket.on('colormovedclient', function (color, callback) {
            callback({
                status: 'color recieved'
            });
            console.log('colors: ', color)
            io.in(room).emit('colormoved', color)
        })

        socket.on('cardPlayedclient', function (gameObject, playerA, playerB, playerC, playerD) {
            io.in(room).emit('cardPlayed', gameObject, playerA, playerB, playerC, playerD)
        })

        socket.on('resetclient', function () {
            io.to(room).emit('reset')
        })

        socket.on('sync_client', function (h1, h2, h3, h4, deck, cardsPlayedFrames, t1, t2, t3, t4, t5, l1, l2, l3, l4, l5, b1, b2, b3, b4, b5, r1, r2, r3, r4, r5) {
            socket.in(room).emit('syncBoard', h1, h2, h3, h4, deck, cardsPlayedFrames, t1, t2, t3, t4, t5, l1, l2, l3, l4, l5, b1, b2, b3, b4, b5, r1, r2, r3, r4, r5)
        })



    }) // end of room connection

    socket.on('disconnect', (reason) => {
        console.log("A user disconnected: " + socket.id)

        let removeIndex = rooms.map(function (e) { return e.connectionID; }).indexOf(socket.id)
        // get the room name of the player that disconnected
        let rm = rooms[removeIndex].gameName
        let person = rooms[removeIndex].player
        rooms.splice(removeIndex, 1)
        let roomGroup = rooms.filter(p => p.gameName === rm);
        // let the other players know some has disconnected
        console.log('disconnect info', rooms)
        io.to(rm).emit('PlayerInfo', roomGroup)
        io.to(rm).emit('disconnection_info', person, reason)

    });

});   //** end of socket connection */

httpServer.listen(PORT, async () => {
    try {
        console.log('Listening on port :%s...', httpServer.address().port)
    }
    catch (e) {
        console.error(e)
    }
});

// ------  FUNCTIONS SECTION ----------
function createHands() {
    let originalDeck = ['2c', '2d', '2h', '2s', '3c', '3d', '3h', '3s', '4c', '4d', '4h', '4s', '5c', '5d', '5h', '5s',
        '6c', '6d', '6h', '6s', '7c', '7d', '7h', '7s', '8c', '8d', '8h', '8s', '9c', '9d', '9h', '9s', '10c', '10d', '10h', '10s',
        'jc', 'jd', 'jh', 'js', 'qc', 'qd', 'qh', 'qs', 'kc', 'kd', 'kh', 'ks', 'ac', 'ad', 'ah', 'as', 'bj', 'rj',
        '22c', '22d', '22h', '22s', '33c', '33d', '33h', '33s', '44c', '44d', '44h', '44s', '55c', '55d', '55h', '55s',
        '66c', '66d', '66h', '66s', '77c', '77d', '77h', '77s', '88c', '88d', '88h', '88s', '99c', '99d', '99h', '99s', '110c', '110d', '110h', '110s',
        'jjc', 'jjd', 'jjh', 'jjs', 'qqc', 'qqd', 'qqh', 'qqs', 'kkc', 'kkd', 'kkh', 'kks', 'aac', 'aad', 'aah', 'aas', 'bbj', 'rrj'];

    shuffle(originalDeck);
    let jokerDeck = [...originalDeck]
    //let jokerDeck = originalDeck.slice();
    let hand1 = [];
    let hand2 = [];
    let hand3 = [];
    let hand4 = [];
    for (var i = 0; i < 6; i++) {
        hand1.push(jokerDeck[0]);
        jokerDeck.shift();
        hand2.push(jokerDeck[0]);
        jokerDeck.shift();
        hand3.push(jokerDeck[0]);
        jokerDeck.shift();
        hand4.push(jokerDeck[0]);
        jokerDeck.shift();
    }
    return [hand1, hand2, hand3, hand4, jokerDeck];
}

function shuffle(arra1) {
    let ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}




