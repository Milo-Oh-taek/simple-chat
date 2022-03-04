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
});

app.get('/', (req, res) => {
    res.send('hello');
})

server.listen(3001, () => console.log('server listening...'));