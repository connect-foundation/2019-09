const io = require('../io');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const playerController = require('../controllers/playerController');

const emitReadyToRoom = ({ roomId, isReady, socketId }) => {
  io.in(roomId).emit('sendReady', { socketId, isReady });
};

const isRoomReady = room => {
  const { players } = room;
  const keys = Object.keys(players);
  return keys.every(key => {
    return players[key].isReady;
  });
};

const sendReadyHandler = (socket, { isReady }) => {
  const room = roomController.getRoomByRoomId(socket.roomId);
  const player = playerController.getPlayerBySocket(socket);
  const { players, status } = room;
  const playerCount = Object.keys(players).length;

  if (status === 'playing') return;

  playerController.setPlayerStatus(player, { isReady });

  emitReadyToRoom({
    roomId: socket.roomId,
    isReady,
    socketId: player.socketId,
  });

  if (isRoomReady(room) && playerCount >= 2) {
    gameController.resetGameProgress(room);
    gameController.initGame(room);
    gameController.prepareSet(room);

    gameController.assignStreamer(room.streamer);
    const viewers = gameController.getViewers(room);
    const keys = Object.keys(viewers);
    keys.forEach(key => {
      gameController.assignViewer(viewers[key], room.streamer);
    });
  }
};

module.exports = sendReadyHandler;
