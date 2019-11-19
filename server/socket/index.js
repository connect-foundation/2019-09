const io = require('socket.io')();
const webRtcUtils = require('./utils');

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
    const minUserCount = 2;

    if (isReady) {
      room.readyUsers[socket.id] = true;
    } else {
      delete room.readyUsers[socket.id];
    }

    if (
      webRtcUtils.checkAllReady(room) &&
      room.readyUsers.length >= minUserCount
    ) {
      const setCount = 80;
      room.gameStatus =
        room.gameStatus ||
        webRtcUtils.makeGameStatus(socketIds, roomNumber, setCount);
      webRtcUtils.distributePlayerTypes(
        io,
        room.gameStatus.gameOrderQueue.shift(),
        socketIds,
      );
    }
  });
});

module.exports = io;
