const registerSignalingEvents = require('./signaling/registerSignalingEvents');
const registerGameEvents = require('./game/registerGameEvents');
const { io } = require('./io');
const { CONNECTION } = require('../constants/event');

io.on(CONNECTION, socket => {
  registerSignalingEvents(socket);
  registerGameEvents(socket);
});

module.exports = io;
