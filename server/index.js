const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('connection');
    socket.on('init', (payload) => {
        console.log(payload);
    });
    socket.on('send message', (item) => {
        console.log(item.name + " : " + item.message);
        io.emit('receive message', item);
    });
});

app.get('/', (req, res) => {
    res.send('hello');
})

server.listen(3001, () => console.log('server listening...'));