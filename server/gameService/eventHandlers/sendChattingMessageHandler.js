const short = require('short-uuid');
const { io } = require('../io');
const roomController = require('../roomController');

const sendChattingMessageHandler = (socket, { nickname, message }) => {
  /**
   * 정답 검증 로직 필요
   * room.quiz === message
   *  emit('정답!')
   */
  const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
  const player = gameManager.getPlayerBySocketId(socket.id);
  io.in(socket.roomId).emit('sendChattingMessage', {
    nickname,
    message,
    nicknameColor: player.getNicknameColor(),
    id: short.generate(),
  });
};

module.exports = sendChattingMessageHandler;
