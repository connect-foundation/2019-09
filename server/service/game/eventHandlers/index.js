const matchHandler = require('./matchHandler');
const sendReadyHandler = require('./sendReadyHandler');
const sendChattingMessageHandler = require('./sendChattingMessageHandler');
const askSocketIdHandler = require('./askSocketIdHandler');
// const disconnectingHandler = require('./disconnectingHandler');

module.exports = {
  matchHandler,
  sendReadyHandler,
  sendChattingMessageHandler,
  askSocketIdHandler,
  // disconnectingHandler,
};
