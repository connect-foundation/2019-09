const io = require('../io');
const { setPlayer } = require('./playerController');
const {
  INITIAL_ROUND,
  MIN_USER_COUNT,
  INITIAL_GAME_STATUS,
} = require('../../config');

const assignStreamer = streamer => {
  io.to(streamer.socketId).emit('assignStreamer');
};

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

const prepareRound = room => {
  room.currentRound++;
  const { players } = room;
  const socketIds = Object.keys(players);
  room.streamerCandidates = [];

  let candidates;
  for (let i = 0; i < INITIAL_ROUND; i++) {
    candidates = socketIds.reduce((accum, socketId) => {
      accum[socketId] = players[socketId];
      return accum;
    }, {});
    room.streamerCandidates.push(candidates);
  }
};

const prepareSet = room => {
  room.currentSet++;
  const streamerCandidates = room.streamerCandidates[0];
  const targetSocketId = Object.keys(streamerCandidates)[0];
  delete room.streamerCandidates[targetSocketId];

  setPlayer(room.players[targetSocketId], { type: 'streamer' });
  room.streamer = room.players[targetSocketId];
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
  prepareRound,
  prepareSet,
  resetGameProgress,
};
