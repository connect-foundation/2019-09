const matchHandler = require('./matchHandler');
const sendReadyHandler = require('./sendReadyHandler');
const sendChattingMessageHandler = require('./sendChattingMessageHandler');
const askSocketIdHandler = require('./askSocketIdHandler');
const connectPeerHandler = require('./connectPeerHandler');
const selectQuizHandler = require('./selectQuizHandler');
const disconnectingHandler = require('./disconnectingHandler');

module.exports = {
  matchHandler,
  sendReadyHandler,
  sendChattingMessageHandler,
  askSocketIdHandler,
  connectPeerHandler,
  selectQuizHandler,
  disconnectingHandler,
};
