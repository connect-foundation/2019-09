const io = require('../io');
// const playerController = require('./playerController');
const {
  INITIAL_ROUND,
  MIN_USER_COUNT,
  INITIAL_GAME_STATUS,
} = require('../../config');
// done
const assignStreamer = streamer => {
  io.to(streamer.socketId).emit('assignStreamer');
};
// done
const assignViewer = (viewer, streamer) => {
  io.to(viewer.socketId).emit('assignViewer', {
    streamerSocketId: streamer.socketId,
  });
};

const isRoundLeft = room => {
  return room.currentRound < INITIAL_ROUND;
};

const isSetLeft = room => {
  if (room.streamerCandidates.length === 0) {
    return false;
  }
  const candidates = Object.keys(room.streamerCandidates[0]);
  if (candidates.length === 0) {
    return false;
  }
  return true;
};

const isGameAvailable = room => {
  const playersLength = Object.keys(room.players).length;

  return playersLength >= MIN_USER_COUNT;
};

const getNextStep = room => {
  if (!isGameAvailable(room)) {
    return 'endGame';
  }
  if (isSetLeft(room)) {
    return 'startSet';
  }
  if (isRoundLeft(room)) {
    return 'startRound';
  }
  return 'endGame';
};

const getViewers = room => {
  const { players } = room;
  const keys = Object.keys(players);
  const viewers = keys.reduce((accum, key) => {
    if (key !== room.streamer.socketId) {
      accum[key] = players[key];
      return accum;
    }
    return accum;
  }, {});

  return viewers;
};
// done
const initGame = room => {
  room.currentRound++;
  const { players } = room;
  const socketIds = Object.keys(players);
  room.streamerCandidates = [];

  for (let i = 0; i < INITIAL_ROUND; i++) {
    const candidates = socketIds.reduce((accum, socketId) => {
      return [...accum, players[socketId]];
    }, []);
    room.streamerCandidates.push(candidates);
  }
};

const prepareSet = room => {
  room.currentSet++;
  const round = room.streamerCandidates[room.currentRound - 1];
  const streamer = round.shift();
  const player = playerController.getPlayerBySocket(streamer.socketId);

  playerController.setPlayerStatus(player, { type: 'streamer' });
  room.streamer = player;
};

const resetGameProgress = room => {
  const keys = Object.keys(INITIAL_GAME_STATUS);
  keys.forEach(key => {
    room[key] = INITIAL_GAME_STATUS[key];
  });
};

module.exports = {
  assignStreamer,
  assignViewer,
  getNextStep,
  getViewers,
  initGame,
  prepareSet,
  resetGameProgress,
};
