const io = require('socket.io')();
const webRtcUtils = require('./utils');

io.on('connection', socket => {
  socket.on('join', ({
    roomNumber
  }) => {
    socket.join(roomNumber);
  });

  socket.on('ready', ({
    isReady
  }) => {
    const [roomNumber] = Object.keys(socket.rooms);
    const room = io.sockets.adapter.rooms[roomNumber];
    const socketIds = Object.keys(room.sockets);

    if (isReady) {
      room.readyUsers[socket.id] = true;
    } else {
      delete room.readyUsers[socket.id];
    }

    if (webRtcUtils.checkAllReady(room)) {
      const setCount = 80;
      room.gameStatus = room.gameStatus || webRtcUtils.makeGameStatus(socketIds, roundNumber, setCount);
      webRtcUtils.distributePlayerTypes(io, gameStatus.gameOrderQueue.shift(), socketIds);
    }

  });
});

module.exports = io;