const { INITIAL_ROUND } = require('../../config');

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

module.exports = prepareRound;
