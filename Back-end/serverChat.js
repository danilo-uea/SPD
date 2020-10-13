const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

/*
const app = express();
app.use(express.json());
app.listen(3002);
*/
app.use(cors());

app.get('/', (req, res) => {
    res.send('server rodando')
});


io.sockets.on('connection', (socket) => {
    socket.on('room', (room) => {
        socket.join(room);
    });

    socket.on('sendChat', (idChat)=> {
        io.sockets.in(idChat).emit('updateChat');
    });
});

http.listen(3002);