const matchHandler = require('./matchHandler');
const sendReadyHandler = require('./sendReadyHandler');
const sendChattingMessageHandler = require('./sendChattingMessageHandler');
const disconnectingHandler = require('./disconnectingHandler');
const sendCandidateHandler = require('./sendCandidateHandler');
const sendDescriptionHandler = require('./sendDescriptionHandler');
const askSocketIdHandler = require('./askSocketIdHandler');

module.exports = {
  matchHandler,
  sendReadyHandler,
  sendChattingMessageHandler,
  disconnectingHandler,
  sendCandidateHandler,
  sendDescriptionHandler,
  askSocketIdHandler,
};
