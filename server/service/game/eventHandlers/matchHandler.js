const Player = require('../models/Player');
const roomController = require('../controllers/roomController');
const { getRandomColor } = require('../../../utils/colorGenerator');
const { NICKNAME_LENGTH } = require('../../../config');
const EVENTS = require('../../../constants/events');

const emitEventsAfterJoin = socket => {
  socket.emit('startChatting');
  socket.emit(EVENTS.SEND_ROOMID, { roomId: socket.roomId });
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
  const isRoomPrivate = !!roomIdFromUrl || isPrivateRoomCreation;

  roomController.joinRoom({ socket, roomId, player, isRoomPrivate });

  if (roomId) {
    const room = roomController.getRoomByRoomId(roomId);
    const otherPlayers = room.gameManager.getOtherPlayers(player.socketId);

    socket.broadcast.to(roomId).emit('sendNewPlayer', player);
    socket.emit('sendPlayers', { players: otherPlayers });
    emitEventsAfterJoin(socket);
  } else {
    /** @todo 토스터 완성되면 여기서 메인보내고 토스터로 없다고 알려줘야함 */
    socket.disconnect();
  }
};

module.exports = matchHandler;
