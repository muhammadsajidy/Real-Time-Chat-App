import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

app.use(cors());

let connected = [];

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    socket.on('new_user', (user) => {
        connected.push(user);
        console.log(`User: ${user.username} has connected`);
    })

    socket.on('join_room', (data) => {
        socket.join(data);
    })

    socket.on('send_message', ({ message, room }) => {
        const user = connected.find(u => u.socket_id === socket.id);
        const username = user ? user.username : 'Unknown';
        socket.to(room).emit('receive_message', { message, room, sender: username });
    });

    socket.on('disconnect', () => {
        const index = connected.findIndex(u => u.socket_id === socket.id);
        if (index !== -1) {
            console.log(`${connected[index].username} disconnected`);
            connected.splice(index, 1);
        }
    })
});

server.listen(3001, () => {
    console.log('Server listening on: http://localhost:3001');
});