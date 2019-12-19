const Player = require('../models/Player');
const roomController = require('../controllers/roomController');
const { getRandomColor } = require('../../../utils/colorGenerator');
const EVENT = require('../../../constants/event');
const { NICKNAME_LENGTH } = require('../../../constants/gameRule');

const emitEventsAfterJoin = socket => {
  socket.emit(EVENT.START_CHATTING);
  socket.emit(EVENT.SEND_ROOMID, { roomId: socket.roomId });
};

const getRoomId = (roomIdFromUrl, isPrivateRoomCreation) => {
  let roomId;
  if (!!roomIdFromUrl || isPrivateRoomCreation) {
    roomId = roomController.getPrivateRoomInformationToJoin(
      roomIdFromUrl,
      isPrivateRoomCreation,
    );
  } else {
    roomId = roomController.getPublicRoomInformantionToJoin();
  }
  return roomId;
};

const matchHandler = (
  socket,
  { nickname, roomIdFromUrl, isPrivateRoomCreation },
) => {
  const roomId = getRoomId(roomIdFromUrl, isPrivateRoomCreation);
  const slicedNickname = nickname.slice(0, NICKNAME_LENGTH);
  const player = new Player({
    nickname: slicedNickname,
    socketId: socket.id,
    nicknameColor: getRandomColor(),
  });

  if (roomId) {
    const isRoomPrivate = !!roomIdFromUrl || isPrivateRoomCreation;
    roomController.joinRoom({ socket, roomId, player, isRoomPrivate });

    const { gameManager } = roomController.getRoomByRoomId(roomId);
    const otherPlayers = gameManager.getOtherPlayers(player.socketId);

    socket.broadcast.to(roomId).emit(EVENT.SEND_NEW_PLAYER, player);
    socket.emit(EVENT.SEND_PLAYERS, { players: otherPlayers });
    emitEventsAfterJoin(socket);
  } else {
    socket.emit(EVENT.ROOM_UNAVAILABLE);
  }
};

module.exports = matchHandler;
