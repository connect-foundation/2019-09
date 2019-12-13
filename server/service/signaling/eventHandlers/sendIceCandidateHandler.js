const { io } = require('../../io');

const sendIceCandidateHandler = (socket, { target, iceCandidate }) => {
  io.to(target).emit('sendIceCandidate', { target: socket.id, iceCandidate });
};

module.exports = sendIceCandidateHandler;
