const Player = require('../models/Player');
const roomController = require('../controllers/roomController');
const { getRandomColor } = require('../../../utils/colorGenerator');
const { NICKNAME_LENGTH } = require('../../../config');

const emitEventsAfterJoin = socket => {
  socket.emit('startChatting');
  socket.emit('sendRoomId', { roomId: socket.roomId });
};

const matchHandler = (
  socket,
  { nickname, roomIdFromUrl, isPrivateRoomCreation },
) => {
  let roomId;
  const slicedNickname = nickname.slice(0, NICKNAME_LENGTH);
  const player = new Player({
    nickname: slicedNickname,
    socketId: socket.id,
    nicknameColor: getRandomColor(),
  });

  const isRoomPrivate = !!roomIdFromUrl || isPrivateRoomCreation;

  if (!!roomIdFromUrl || isPrivateRoomCreation) {
    roomId = roomController.getPrivateRoomInformationToJoin(
      roomIdFromUrl,
      isPrivateRoomCreation,
    );
  } else {
    roomId = roomController.getPublicRoomInformantionToJoin();
  }

  roomController.joinRoom({ socket, roomId, player, isRoomPrivate });

  if (roomId) {
    /**
     * 새로운 플레이어는 기존 플레이어의 정보들을 전달받고
     * 기존의 플레이어들은 새로운 플레이어의 정보를 전달받는다.
     */
    const room = roomController.getRoomByRoomId(roomId);
    const otherPlayers = room.gameManager.getOtherPlayers(player.socketId);

    socket.broadcast.to(roomId).emit('sendNewPlayer', player);
    socket.emit('sendPlayers', { players: otherPlayers });
  } else {
    /** @todo 토스터 완성되면 여기서 메인보내고 토스터로 없다고 알려줘야함 */
    socket.disconnect();
    return;
  }
  emitEventsAfterJoin(socket);
};

module.exports = matchHandler;
