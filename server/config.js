module.exports = {
  INITIAL_ROUND: 1,
  MIN_USER_COUNT: 2,
  MAX_USER_COUNT: 4,
  ONE_SET_SECONDS: 80,
  MAX_ROUND_NUMBER: 3,

  INITIAL_PLAYER_STATUS: {
    isReady: false,
    type: 'viewer',
    score: 0,
  },

  INITIAL_GAME_STATUS: {
    currentRound: 0,
    currentSet: 0,
    streamerSocketId: '',
  },
};
