const { INITIAL_GAME_STATUS } = require('../../config');

const resetGameProgress = room => {
  const keys = Object.keys(INITIAL_GAME_STATUS);
  keys.forEach(key => {
    room[key] = INITIAL_GAME_STATUS[key];
  });
};

module.exports = resetGameProgress;
