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
      const streamerIndex = 0;
      webRtcUtils.distributePlayerTypes(io, streamerIndex, socketIds)
    }

  });
});

module.exports = io;