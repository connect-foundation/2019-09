const { setPlayer } = require('../player');

const prepareSet = room => {
  room.currentSet++;
  const streamerCandidates = room.streamerCandidates[0];
  const targetSocketId = Object.keys(streamerCandidates)[0];
  delete room.streamerCandidates[targetSocketId];

  setPlayer(room.players[targetSocketId], { type: 'streamer' });
  room.streamer = room.players[targetSocketId];
};

module.exports = prepareSet;
