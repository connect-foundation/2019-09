const {
  matchHandler,
  sendReadyHandler,
  sendChattingMessageHandler,
  disconnectingHandler,
} = require('./eventHandlers');
const io = require('./io');

io.on('connection', socket => {
  /**
   * 게임 전
   */
  socket.on('askSocketId', () => {
    socket.emit('sendSocketId', { socketId: socket.id });
  });
  socket.on('match', matchHandler.bind(null, socket));

  socket.on('sendReady', sendReadyHandler.bind(null, socket));

  /**
   * 게임로직 필요
   * ....
   */

  /**
   * 채팅
   */
  socket.on(
    'sendChattingMessage',
    sendChattingMessageHandler.bind(null, socket),
  );

  /**
   * socket disconnect 관리
   */
  socket.on('disconnecting', disconnectingHandler.bind(null, socket));

  socket.on('sendDescription', ({ target, description }) => {
    io.to(target).emit('sendDescription', { target: socket.id, description });
  });

  socket.on('sendCandidate', ({ target, candidate }) => {
    io.to(target).emit('sendCandidate', { target: socket.id, candidate });
  });
});

module.exports = io;
