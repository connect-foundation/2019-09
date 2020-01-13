const { io } = require('../../io');
const { SEND_DESCRIPTION } = require('../../../constants/event');

const sendDescriptionHandler = (socket, { target, description }) => {
  io.to(target).emit(SEND_DESCRIPTION, { target: socket.id, description });
};

module.exports = sendDescriptionHandler;
