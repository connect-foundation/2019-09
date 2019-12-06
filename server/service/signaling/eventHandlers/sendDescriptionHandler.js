const { io } = require('../../io');

const sendDescriptionHandler = (socket, { target, description }) => {
  io.to(target).emit('sendDescription', { target: socket.id, description });
};

module.exports = sendDescriptionHandler;
