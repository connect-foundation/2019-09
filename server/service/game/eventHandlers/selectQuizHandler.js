const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');

const selectQuizHandler = (socket, { quiz }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  gameController.startSet(gameManager, timer, quiz);
};

module.exports = selectQuizHandler;
