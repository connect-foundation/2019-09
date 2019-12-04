const {
  sendDescriptionHandler,
  sendIceCandidateHandler,
} = require('./eventHandlers');

module.exports = socket => {
  socket.on('sendDescription', sendDescriptionHandler.bind(null, socket));
  socket.on('sendIceCandidate', sendIceCandidateHandler.bind(null, socket));
};
