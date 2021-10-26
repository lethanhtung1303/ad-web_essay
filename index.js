require('dotenv').config();
const path = require('path');
const express = require('express');
const socket = require('socket.io');
const route = require('./routes');

const app = express();

const POST = process.env.PORT || 3000;

// Static file
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

// Route init
route(app);

const httpServer = app.listen(POST, () =>
    console.log('http://localhost:' + POST),
);

const io = socket(httpServer);

const formatMsg = require('./app/models/message');

const {
    userJoin,
    getOldUser,
    getByeUser,
    getUserInRoom,
} = require('./app/models/users');

const botCute = 'Bot Cute 🥰😍😘';

io.on('connection', (client) => {
    client.on('joinRoom', ({ inputUserName, choseRoom }) => {
        const user = userJoin(client.id, inputUserName, choseRoom);

        client.join(user.room);

        client.emit(
            'msg',
            formatMsg(botCute, `Welcome ${user.username} 🌹💮🌸 !!!!!`),
        );

        client.broadcast
            .to(user.room)
            .emit(
                'msg',
                formatMsg(
                    botCute,
                    `Welcome ${user.username} join room 💘💝💖!!!!!`,
                ),
            );

        io.to(user.room).emit('room', {
            room: user.room,
            users: getUserInRoom(user.room),
        });
    });

    client.on('chatMsg', (msg) => {
        const user = getOldUser(client.id);
        io.to(user.room).emit('msg', formatMsg(user.username, msg));
    });

    client.on('disconnect', () => {
        const user = getByeUser(client.id);
        if (user) {
            io.to(user.room).emit(
                'msg',
                formatMsg(botCute, `Good bye ${user.username} 😭😔😟 !!!!!`),
            );

            io.to(user.room).emit('room', {
                room: user.room,
                users: getUserInRoom(user.room),
            });
        }
    });
});
