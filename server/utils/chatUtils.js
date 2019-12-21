const { MAX_CHAT_LENGTH, NICKNAME_LENGTH } = require('../constants/gameRule');

const sliceChatToMaxLength = chat => {
  return chat.slice(0, MAX_CHAT_LENGTH);
};

const processChatWithSystemRule = chat => {
  const trimmedChat = chat.trim();
  if (!trimmedChat) return trimmedChat;
  return sliceChatToMaxLength(trimmedChat);
};

const processNicknameWithSystemRule = nickname => {
  return nickname.slice(0, NICKNAME_LENGTH);
};

module.exports = { processChatWithSystemRule, processNicknameWithSystemRule };
