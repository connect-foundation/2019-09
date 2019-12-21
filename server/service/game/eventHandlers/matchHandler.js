const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const { getRandomColor } = require('../../../utils/colorGenerator');
const EVENT = require('../../../constants/event');
const { processNicknameWithSystemRule } = require('../../../utils/chatUtils');

const matchHandler = (
  socket,
  { nickname, roomIdFromUrl, isPrivateRoomCreation },
) => {
  let roomId;
  const isPrivateRoomJoin = !!roomIdFromUrl;
  const isRoomPrivate = !!roomIdFromUrl || isPrivateRoomCreation;

  const processedNickname = processNicknameWithSystemRule(nickname);
  const player = gameController.createPlayer({
    nickname: processedNickname,
    socketId: socket.id,
    nicknameColor: getRandomColor(),
  });

  if (isPrivateRoomJoin) {
    roomId = roomController.getPrivateRoomIdToJoin(roomIdFromUrl);
    /**
     * 비공개방 url 접근시 목표방에 접근이 불가할때
     */
    if (!roomId) {
      gameController.sendRoomUnavailableEventToSocket(socket);
    }
  } else if (isPrivateRoomCreation) {
    roomId = roomController.getPrivateRoomIdToCreate();
  } else {
    roomId = roomController.getPublicRoomIdToJoin();
  }

  roomController.joinRoom({ socket, roomId, player, isRoomPrivate });

  const { gameManager } = roomController.getRoomByRoomId(roomId);
  const otherPlayers = gameManager.getOtherPlayers(player.socketId);

  gameController.broadcastToRoom(socket, roomId, EVENT.SEND_NEW_PLAYER, player);
  gameController.sendPlayersToSocket(socket, otherPlayers);
  gameController.sendStartChattingEventToSocket(socket);
  gameController.sendRoomIdToSocket(socket);
};

module.exports = matchHandler;
