const {
  matchHandler,
  sendReadyHandler,
  sendChattingMessageHandler,
  disconnectingHandler,
  sendDescriptionHandler,
  sendCandidateHandler,
  askSocketIdHandler,
} = require('./eventHandlers');
const { io } = require('./io');

io.on('connection', socket => {
  /**
   * 게임 전
   */
  socket.on('askSocketId', askSocketIdHandler.bind(null, socket));
  socket.on('match', matchHandler.bind(null, socket));
  socket.on('sendReady', sendReadyHandler.bind(null, socket));
  // socket.on('connectPeer', connectPeerHandler.bind(null, socket));
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
  // socket.on('disconnecting', disconnectingHandler.bind(null, socket));
  socket.on('sendDescription', sendDescriptionHandler.bind(null, socket));
  socket.on('sendCandidate', sendCandidateHandler.bind(null, socket));
});

module.exports = io;
