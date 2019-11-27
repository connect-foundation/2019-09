const {
  matchHandler,
  sendReadyHandler,
  disconnectingHandler,
} = require('./handlers');
const io = require('./io');

io.on('connection', socket => {
  socket.on('askSocketId', () => {
    socket.emit('sendSocketId', { socketId: socket.id });
  });
  socket.on('match', matchHandler.bind(null, socket));

  socket.on('sendReady', sendReadyHandler.bind(null, socket));

  socket.on('disconnecting', disconnectingHandler.bind(null, socket));

  socket.on('sendDescription', ({ target, description }) => {
    io.to(target).emit('sendDescription', { target: socket.id, description });
  });

  socket.on('sendCandidate', ({ target, candidate }) => {
    io.to(target).emit('sendCandidate', { target: socket.id, candidate });
  });
});

module.exports = io;
