const { INITIAL_ROUND, MIN_USER_COUNT } = require('../../config');

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

module.exports = getNextStep;
