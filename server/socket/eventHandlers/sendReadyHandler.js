const { io } = require('../io');

const roomController = require('../controllers/roomController');
const { MIN_PLAYER_COUNT } = require('../../config');

const assignStreamer = streamer => {
  io.to(streamer.socketId).emit('assignStreamer');
};

const assignViewer = (viewer, streamer) => {
  io.to(viewer.socketId).emit('assignViewer', {
    streamerSocketId: streamer.socketId,
  });
};
const sendReady = ({ roomId, socketId, isReady }) => {
  console.log('sendReadyHandler : ', roomId, socketId, isReady);
  io.in(roomId).emit('sendReady', { socketId, isReady });
};

const isRoomReady = gameManager => {
  const players = gameManager.getPlayers();
  return players.every(player => player.getIsReady());
};

const assignPlayerType = gameManager => {
  const streamer = gameManager.getStreamer();
  const viewers = gameManager.getOtherPlayers(streamer.socketId);

  assignStreamer(streamer);
  viewers.forEach(viewer => {
    assignViewer(viewer, streamer);
  });
};

const sendReadyHandler = (socket, { isReady }) => {
  const room = roomController.getRoomByRoomId(socket.roomId);
  const { gameManager } = room;
  const playerCount = gameManager.getPlayers().length;

  if (gameManager.status === 'playing') return;

  const player = gameManager.getPlayerBySocketId(socket.id);
  player.setIsReady(isReady);

  sendReady({ roomId: socket.roomId, socketId: player.socketId, isReady });

  if (isRoomReady(room.gameManager) && playerCount >= MIN_PLAYER_COUNT) {
    gameManager.reset();
    gameManager.prepareGame();
    gameManager.prepareSet();
    assignPlayerType(gameManager);
  }
};

module.exports = sendReadyHandler;
