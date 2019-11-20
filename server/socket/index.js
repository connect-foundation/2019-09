const io = require('socket.io')();
const webRtcUtils = require('./utils');
const config = require('../config');

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

    if (
      webRtcUtils.checkAllReady(room) &&
      room.readyUsers.length >= config.MIN_USER_COUNT
    ) {
      room.gameStatus =
        room.gameStatus ||
        webRtcUtils.makeGameStatus(
          socketIds,
          roomNumber,
          config.ONE_SET_SECONDS,
        );
      webRtcUtils.distributePlayerTypes(
        io,
        room.gameStatus.gameOrderQueue.shift(),
        socketIds,
      );
    }
  });
});

module.exports = io;