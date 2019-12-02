const io = require('../io');
const { /* setRoom, */ getRoomByRoomId } = require('../room');
const {
  prepareSet,
  prepareRound,
  assignStreamer,
  assignViewer,
  resetGameProgress,
  getViewers,
} = require('../game');
const { setPlayer, getPlayerBySocket } = require('../player');

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
  const room = getRoomByRoomId(socket.roomId);
  const player = getPlayerBySocket(socket);
  const { status } = room;
  if (status === 'playing') {
    return;
  }

  setPlayer(player, { isReady });

  emitReadyToRoom({
    roomId: socket.roomId,
    isReady,
    socketId: player.socketId,
  });

  if (isRoomReady(room)) {
    resetGameProgress(room);
    prepareRound(room);
    prepareSet(room);

    assignStreamer(room.streamer);
    const viewers = getViewers(room);
    const keys = Object.keys(viewers);
    keys.forEach(key => {
      assignViewer(viewers[key], room.streamer);
    });
  }
};

module.exports = sendReadyHandler;
