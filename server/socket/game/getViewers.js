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

module.exports = getViewers;
