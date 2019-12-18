const { io } = require('../../io');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const {
  SECONDS_AFTER_GAME_END,
  GAME_PLAYING,
  GAME_INITIALIZING,
  CONNECTING,
  MIN_PLAYER_COUNT,
} = require('../../../config');

const LeavePlayer = (gameManager, socket) => {
  gameManager.leaveRoom(socket.id);
  socket.leave(gameManager.getRoomId());
};

const sendLeftPlayerToRoom = (roomId, socketId) => {
  io.in(roomId).emit('sendLeftPlayer', {
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
    LeavePlayer(gameManager, socket);
    sendLeftPlayerToRoom(gameManager.getRoomId(), socket.id);

    if (
      roomStatus === 'waiting' &&
      gameManager.checkAllPlayersAreReady() &&
      gameManager.getPlayers().length >= MIN_PLAYER_COUNT
    ) {
      gameController.prepareGame(gameManager, timer);
      return;
    }

    if (
      roomStatus === GAME_INITIALIZING ||
      roomStatus === GAME_PLAYING ||
      roomStatus === CONNECTING ||
      roomStatus === 'scoreSharing'
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
