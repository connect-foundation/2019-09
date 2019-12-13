const { MAX_CHAT_LENGTH } = require('../config');

const sliceChatToMaxLength = chat => {
  return chat.slice(0, MAX_CHAT_LENGTH);
};

const processChatWithSystemRule = chat => {
  const trimmedChat = chat.trim();
  if (!trimmedChat) return trimmedChat;
  return sliceChatToMaxLength(trimmedChat);
};

module.exports = { processChatWithSystemRule };
