module.exports = {
  distributePlayerTypes(io, streamerId, socketIds) {
    socketIds.forEach(socketId => {
      if (streamerId === socketId) {
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

};