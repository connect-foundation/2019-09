const io = require('../io');

const assignStreamer = streamer => {
  io.to(streamer.socketId).emit('assignStreamer');
};

module.exports = assignStreamer;
