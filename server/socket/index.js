const io = require('socket.io')();
const {
  isRoomReady,
  makeGameStatus,
  distributePlayerTypes,
} = require('./utils');
const { MIN_USER_COUNT, ONE_SET_SECONDS } = require('../config');

io.on('connection', socket => {
  socket.on('join', ({ roomNumber }) => {
    socket.join(roomNumber);
    const room = io.sockets.adapter.rooms[roomNumber];
    room.readyUsers = room.readyUsers || {};
  });

  socket.on('ready', ({ isReady }) => {
    const [roomNumber] = Object.keys(socket.rooms);
    const room = io.sockets.adapter.rooms[roomNumber];
    const socketIds = Object.keys(room.sockets);

    if (isReady) {
      room.readyUsers[socket.id] = true;
    } else {
      delete room.readyUsers[socket.id];
    }

    if (isRoomReady(room) && room.readyUsers.length >= MIN_USER_COUNT) {
      room.gameStatus =
        room.gameStatus ||
        makeGameStatus({
          socketIds,
          roomNumber,
          count: ONE_SET_SECONDS,
        });
      distributePlayerTypes({
        io,
        socketIds,
        streamer: room.gameStatus.gameOrderQueue.shift(),
      });
    }
  });
});

module.exports = io;
