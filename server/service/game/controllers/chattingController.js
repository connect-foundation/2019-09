const EVENT = require('../../../constants/event');

const generateCorrectionNotice = (payload, playerNickname) => {
  payload.nickname = '안내';
  payload.message = `${playerNickname}님이 정답을 맞췄습니다!`;
  return payload;
};

const sendChattingMessageToRoom = (io, roomId, payload) => {
  if (payload.message) {
    io.in(roomId).emit(EVENT.SEND_CHATTING_MESSAGE, payload);
  }
};

module.exports = { sendChattingMessageToRoom, generateCorrectionNotice };
