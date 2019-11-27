const {
  matchHandler,
  sendReadyHandler,
  sendChattingMessageHandler,
} = require('./handlers');
const io = require('./io');

io.on('connection', socket => {
  socket.on('askSocketId', () => {
    socket.emit('sendSocketId', { socketId: socket.id });
  });
  socket.on('match', matchHandler.bind(null, socket));

  socket.on('sendReady', sendReadyHandler.bind(null, socket));

  socket.on(
    'sendChattingMessage',
    sendChattingMessageHandler.bind(null, socket),
  );
});

module.exports = io;
