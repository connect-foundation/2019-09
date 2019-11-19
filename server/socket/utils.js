module.exports = {
  distributePlayerTypes(io, streamer, socketIds) {
    socketIds.forEach(socketId => {
      if (streamer.socketId === socketId) {
        io.to(socketId).emit('playerType:streamer');
      } else {
        io.to(socketId).emit('playerType:viewer');
      }
    });
  },

  makeGameOrderQueue(socketIds, roundNumber) {
    const gameOrderQueue = [];
    const roundQueue = socketIds.map(socketId => {
      return {
        type: 'player',
        socketId
      };
    });

    for (let i = 0; i < roundNumber; i += 1) {
      gameOrderQueue.push(...roundQueue);
      gameOrderQueue.push({
        type: 'roundEnd',
        round: i + 1
      });
    }
    gameOrderQueue.push({
      type: 'gameEnd'
    });
    return gameOrderQueue;
  },

  filterGameOrderQueue(targetSocketId, gameOrderQueue) {
    return gameOrderQueue.filter(player => {
      return player.socketId !== targetSocketId
    });
  },

  checkAllReady(room) {
    const socketIds = Object.keys(room.sockets);
    const readyUsers = Object.keys(room.readyUsers);
    return socketIds.length === readyUsers.length;
  },

  makeGameStatus(socketIds, roundNumber, count) {
    const initialRound = 1;
    const initialGameStatus = {
      gameOrderQueue: makeGameOrderQueue(socketIds, roundNumber),
      currentStreamer: this.gameOrderQueue[0],
      currentCount: count,
      isPlaying: true,
      currentRound: initialRound,
    }
    return initialGameStatus;
  },

};