const { io } = require('../../io');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const GAME_STATUS = require('../../../constants/gameStatus');
const { MIN_PLAYER_COUNT } = require('../../../constants/gameRule');
const { SEND_LEFT_PLAYER } = require('../../../constants/event');

const leavePlayer = (gameManager, socket) => {
  gameManager.leaveRoom(socket.id);
  socket.leave(gameManager.getRoomId());
};

const sendLeftPlayerToRoom = (roomId, socketId) => {
  io.in(roomId).emit(SEND_LEFT_PLAYER, {
    socketId,
  });
};

const disconnectingHandler = socket => {
  try {
    const room = roomController.getRoomByRoomId(socket.roomId);
    if (!room) {
      return;
    }
    const { gameManager, timer } = room;
    const roomStatus = gameManager.getStatus();
    leavePlayer(gameManager, socket);
    sendLeftPlayerToRoom(gameManager.getRoomId(), socket.id);

    const isGamePreparable =
      roomStatus === GAME_STATUS.WAITING &&
      gameManager.checkAllPlayersAreReady() &&
      gameManager.getPlayers().length >= MIN_PLAYER_COUNT;

    if (isGamePreparable) {
      gameController.prepareGame(gameManager, timer);
      return;
    }

    if (
      roomStatus === GAME_STATUS.INITIALIZING ||
      roomStatus === GAME_STATUS.PLAYING ||
      roomStatus === GAME_STATUS.CONNECTING ||
      roomStatus === GAME_STATUS.SCORE_SHARING
    ) {
      if (!gameManager.isGameContinuable() || !gameManager.getStreamer()) {
        gameController.repeatSet(gameManager, timer);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = disconnectingHandler;
