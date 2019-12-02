const removePlayerFromRoom = (player, room) => {
  delete room.players[player.socketId];
  if (room.streamerCandidates) {
    room.streamerCandidates.forEach(candidates => {
      if (candidates[player.socketId]) {
        delete candidates[player.socketId];
      }
    });
  }
  if (room.streamer && room.streamer.socketId === player.socketId) {
    room.streamer = {};
  }
};

module.exports = removePlayerFromRoom;
