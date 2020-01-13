const { io } = require('../../io');
const { SEND_ICE_CANDIDATE } = require('../../../constants/event');

const sendIceCandidateHandler = (socket, { target, iceCandidate }) => {
  io.to(target).emit(SEND_ICE_CANDIDATE, { target: socket.id, iceCandidate });
};

module.exports = sendIceCandidateHandler;
