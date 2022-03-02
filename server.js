const express = require("express");
const { createServer } = require("http");
const { userInfo } = require("os");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer);

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

const PORT = process.env.PORT || 5056;
let rooms = [];

//*** beginning of socket connection */
io.on('connection', async (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('roominfo', (room, playersrealname) => {
        
        rooms.push({ gameName: room, connectionID: socket.id, player: playersrealname })
        console.log('users that are connected',rooms)
        socket.join(room)
        let ctr = 0

        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].gameName === room) {
                ctr++
            }
        }

        if (ctr > 4) {
            io.to(socket.id).emit('playerWarning')
        }

        io.to(socket.id).emit('PlayerInfo', rooms)
                
        socket.on('connectedPlayersServer', function(p1,p2,p3,p4){
            io.to(room).emit('connectedPlayers', p1,p2,p3,p4)
        })

        socket.on('moveCompletedclient', (t1x, t1y,t2x,t2y,t3x,t3y,t4x,t4y,t5x,t5y,
            l1x, l1y,l2x,l2y,l3x,l3y,l4x,l4y,l5x,l5y, b1x, b1y,b2x,b2y,b3x,b3y,b4x,b4y,b5x,b5y, r1x, r1y,r2x,r2y,r3x,r3y,r4x,r4y,r5x,r5y) => {
            console.log('moveCompeted ', t1x, t1y)
            socket.to(room).volatile.emit('moveCompleted', t1x, t1y,t2x,t2y,t3x,t3y,t4x,t4y,t5x,t5y,
            l1x, l1y,l2x,l2y,l3x,l3y,l4x,l4y,l5x,l5y, b1x, b1y,b2x,b2y,b3x,b3y,b4x,b4y,b5x,b5y, r1x, r1y,r2x,r2y,r3x,r3y,r4x,r4y,r5x,r5y)
        })

        socket.on('dealCardsclient', function () {
            // console.log('hands',hands)
            let hands = createHands()
            io.in(room).volatile.emit('dealCards', hands) // to all clients in the same room
        })

        socket.on('cardPlayedclient', function (gameObject) {
            io.in(room).volatile.emit('cardPlayed', gameObject)
        })

        socket.on('resetclient', function () {
            io.to(room).emit('reset')
        })

        socket.on('sync_client', function(h1,h2,h3,h4,deck,cardsPlayedFrames){
            socket.in(room).emit('syncBoard', h1,h2,h3,h4,deck,cardsPlayedFrames)
        })
        

       
    }) // end of connection
    socket.on('disconnect', () => {
        console.log("A user disconnected: " + socket.id, rooms)
        let removeIndex = rooms.map(function(e){return e.connectionID;}).indexOf(socket.id)
        // get the room name of the player that disconnected
        let rm = rooms[removeIndex].gameName
        rooms.splice(removeIndex,1)
        // let the other players know some has disconnected
        io.to(rm).emit('PlayerInfo', rooms)

    });
    
});
//** end of socket connection */
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
        '2c', '2d', '2h', '2s', '3c', '3d', '3h', '3s', '4c', '4d', '4h', '4s', '5c', '5d', '5h', '5s',
        '6c', '6d', '6h', '6s', '7c', '7d', '7h', '7s', '8c', '8d', '8h', '8s', '9c', '9d', '9h', '9s', '10c', '10d', '10h', '10s',
        'jc', 'jd', 'jh', 'js', 'qc', 'qd', 'qh', 'qs', 'kc', 'kd', 'kh', 'ks', 'ac', 'ad', 'ah', 'as', 'bj', 'rj'];

    shuffle(originalDeck);
    let jokerDeck = originalDeck.slice();
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



