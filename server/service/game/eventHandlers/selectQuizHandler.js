const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');

const selectQuizHandler = (socket, { quiz }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  /**
   * 전송자가 스트리머인지,
   * 게임의 상태가 단어 선택 단계인지,
   * 퀴즈의 단어가 선택됐는지,
   * 마지막으로 퀴즈의 단어가 목록에 있는지 확인하는 로직
   */
  if (gameController.isGameStartable(gameManager, socket, quiz)) {
    gameController.startSet(gameManager, timer, quiz);
  }
};

module.exports = selectQuizHandler;
