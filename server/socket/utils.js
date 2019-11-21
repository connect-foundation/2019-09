const { INITIAL_ROUND } = require('../config');

const getViewerSocketIds = (socketIds, streamer) => {
  return socketIds.filter(socketId => socketId !== streamer.socketId);
};

const distributePlayerTypes = ({ io, streamer, socketIds }) => {
  socketIds.forEach(socketId => {
    if (streamer.socketId === socketId) {
      io.to(socketId).emit('playerType:streamer', {
        viewerSocketIds: getViewerSocketIds(socketIds, streamer),
      });
    } else {
      io.to(socketId).emit('playerType:viewer', {
        streamerSocketId: streamer.socketId,
      });
    }
  });
};

const makeGameOrderQueue = (socketIds, roundNumber) => {
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
};

const filterGameOrderQueue = (targetSocketId, gameOrderQueue) => {
  return gameOrderQueue.filter(player => player.socketId !== targetSocketId);
};

const isRoomReady = room => {
  const socketIds = Object.keys(room.sockets);
  const readyUsers = Object.keys(room.readyUsers);
  return socketIds.length === readyUsers.length;
};

const makeGameStatus = ({ socketIds, roundNumber, count }) => {
  const gameOrderQueue = makeGameOrderQueue(socketIds, roundNumber);
  const [currentStreamer] = gameOrderQueue;
  const initialGameStatus = {
    gameOrderQueue,
    currentStreamer,
    currentCount: count,
    isPlaying: true,
    currentRound: INITIAL_ROUND,
  };
  return initialGameStatus;
};

module.exports = {
  getViewerSocketIds,
  distributePlayerTypes,
  makeGameOrderQueue,
  filterGameOrderQueue,
  isRoomReady,
  makeGameStatus,
};
