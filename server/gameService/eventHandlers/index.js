const matchHandler = require('./matchHandler');
const sendReadyHandler = require('./sendReadyHandler');
const sendChattingMessageHandler = require('./sendChattingMessageHandler');
const sendCandidateHandler = require('./sendCandidateHandler');
const sendDescriptionHandler = require('./sendDescriptionHandler');
const askSocketIdHandler = require('./askSocketIdHandler');
// const disconnectingHandler = require('./disconnectingHandler');

module.exports = {
  matchHandler,
  sendReadyHandler,
  sendChattingMessageHandler,
  sendCandidateHandler,
  sendDescriptionHandler,
  askSocketIdHandler,
  // disconnectingHandler,
};
