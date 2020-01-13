const {
  matchHandler,
  sendReadyHandler,
  sendChattingMessageHandler,
  disconnectingHandler,
  askSocketIdHandler,
  connectPeerHandler,
  selectQuizHandler,
} = require('./eventHandlers');
const EVENT = require('../../constants/event');

module.exports = socket => {
  /**
   * 게임 전
   */
  socket.on(EVENT.ASK_SOCKET_ID, askSocketIdHandler.bind(null, socket));
  socket.on(EVENT.MATCH, matchHandler.bind(null, socket));
  socket.on(EVENT.SEND_READY, sendReadyHandler.bind(null, socket));
  /**
   * 세트준비
   */
  socket.on(EVENT.CONNECT_PEER, connectPeerHandler.bind(null, socket));
  socket.on(EVENT.SELECT_QUIZ, selectQuizHandler.bind(null, socket));
  /**
   * 채팅
   */
  socket.on(
    EVENT.SEND_CHATTING_MESSAGE,
    sendChattingMessageHandler.bind(null, socket),
  );

  /**
   * socket disconnect 관리
   */
  socket.on(EVENT.DISCONNECTING, disconnectingHandler.bind(null, socket));
};
