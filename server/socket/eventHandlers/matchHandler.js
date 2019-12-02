const playerController = require('../controllers/playerController');
const roomController = require('../controllers/roomController');
const { getRandomColor } = require('../../utils/colorGenerator');

const emitEventsAfterJoin = (socket, roomId) => {
  socket.emit('sendRoomId', { roomId });
  socket.emit('startChatting');
};

const getOtherPlayers = (roomId, player) => {
  const room = roomController.getRoomByRoomId(roomId);
  const socketIds = Object.keys(room.players);
  const otherPlayers = socketIds.reduce((accum, socketId) => {
    if (socketId !== player.socketId) {
      accum[socketId] = room.players[socketId];
      return accum;
    }
    return accum;
  }, {});
  return otherPlayers;
};

const joinExistingRoom = ({ socket, roomId, player }) => {
  roomController.joinRoom({ socket, roomId, player });

  emitEventsAfterJoin(socket, roomId);

  socket.broadcast.to(roomId).emit('sendNewPlayer', player);

  const otherPlayers = getOtherPlayers(roomId, player);
  socket.emit('sendPlayers', { players: otherPlayers });
};

const createRoom = (socket, player) => {
  const roomId = roomController.generateRoomId();
  roomController.initializeRoom({ socket, roomId, player });
  emitEventsAfterJoin(socket, roomId);
};

const matchHandler = (socket, { nickname }) => {
  const player = playerController.createPlayer({
    nickname,
    socketId: socket.id,
    nicknameColor: getRandomColor(),
  });

  const joinableRoomId = roomController.getJoinableRoomId();
  if (joinableRoomId) {
    return joinExistingRoom({ socket, roomId: joinableRoomId, player });
  }
  return createRoom(socket, player);
};

module.exports = matchHandler;
