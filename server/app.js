const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require('socket.io')();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  socket.on('join', ({ roomNumber }) => {
    socket.join(roomNumber);
  });

  socket.on('ready', ({ isReady }) => {
    const [roomNumber] = Object.keys(socket.rooms);
    const room = io.sockets.adapter.rooms[roomNumber];

    if (isReady) {
      room.readyUsers[socket.id] = true;
    } else {
      delete room.readyUsers[socket.id];
    }
  });
});
app.io = io;

module.exports = app;
