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

    if (isReady) {
      room.readyUsers[socket.id] = true;
    } else {
      delete room.readyUsers[socket.id];
    }

    const socketIds = Object.keys(room.sockets);
    const readyUsers = Object.keys(room.readyUsers);

    if (socketIds.length === readyUsers.length) {
      const streamerIndex = 0;
      webRtcUtils.distributePlayerTypes(io, streamerIndex, socketIds)
    }

  });
});

module.exports = io;