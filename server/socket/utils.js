const config = require('../config');

module.exports = {
  distributePlayerTypes({ io, streamer, socketIds }) {
    socketIds.forEach(socketId => {
      if (streamer.socketId === socketId) {
        io.to(socketId).emit('playerType:streamer', {
          viewerSocketIds: this.getViewerSocketIds(socketIds, streamer),
        });
      } else {
        io.to(socketId).emit('playerType:viewer', {
          streamerSocketId: streamer.socketId,
        });
      }
    });
  },

  getViewerSocketIds(socketIds, streamer) {
    return socketIds.filter(socketId => socketId !== streamer.socketId);
  },

  makeGameOrderQueue(socketIds, roundNumber) {
    const gameOrderQueue = [];
    const roundQueue = socketIds.map(socketId => {
      return { type: 'player', socketId };
    });

    for (let i = 0; i < roundNumber; i++) {
      gameOrderQueue.push(...roundQueue);
      gameOrderQueue.push({ type: 'roundEnd', round: i + 1 });
    }
    gameOrderQueue.push({ type: 'gameEnd' });
    return gameOrderQueue;
  },

  filterGameOrderQueue(targetSocketId, gameOrderQueue) {
    return gameOrderQueue.filter(player => player.socketId !== targetSocketId);
  },

  isRoomReady(room) {
    const socketIds = Object.keys(room.sockets);
    const readyUsers = Object.keys(room.readyUsers);
    return socketIds.length === readyUsers.length;
  },

  makeGameStatus({ socketIds, roundNumber, count }) {
    const initialGameStatus = {
      gameOrderQueue: this.makeGameOrderQueue(socketIds, roundNumber),
      currentStreamer: this.gameOrderQueue[0],
      currentCount: count,
      isPlaying: true,
      currentRound: config.INITIAL_ROUND,
    };
    return initialGameStatus;
  },
};
