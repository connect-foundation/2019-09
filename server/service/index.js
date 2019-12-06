const registerSignalingEvents = require('./signaling/registerSignalingEvents');
const registerGameEvents = require('./game/registerGameEvents');
const { io } = require('./io');

io.on('connection', socket => {
  registerSignalingEvents(socket);
  registerGameEvents(socket);
});

module.exports = io;
