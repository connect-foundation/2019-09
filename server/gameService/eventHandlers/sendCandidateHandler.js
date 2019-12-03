const { io } = require('../io');

const sendCandidateHandler = (socket, { target, candidate }) => {
  io.to(target).emit('sendCandidate', { target: socket.id, candidate });
};

module.exports = sendCandidateHandler;
