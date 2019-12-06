const {
  matchHandler,
  sendReadyHandler,
  sendChattingMessageHandler,
  disconnectingHandler,
  askSocketIdHandler,
  connectPeerHandler,
  selectQuizHandler,
} = require('./eventHandlers');

module.exports = socket => {
  /**
   * 게임 전
   */
  socket.on('askSocketId', askSocketIdHandler.bind(null, socket));
  socket.on('match', matchHandler.bind(null, socket));
  socket.on('sendReady', sendReadyHandler.bind(null, socket));
  /**
   * 세트준비
   */
  socket.on('connectPeer', connectPeerHandler.bind(null, socket));
  socket.on('selectQuiz', selectQuizHandler.bind(null, socket));
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
};
