const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');

const connectPeerHandler = socket => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  gameController.setIsConnectedToStreamer(gameManager, true, socket);

  /** 연결 준비 후 정상 시작 */
  if (gameController.isSetPreparable(gameManager)) {
    gameController.clearTimer(timer);
    gameController.prepareSet(gameManager, timer);
  }
};

module.exports = connectPeerHandler;
