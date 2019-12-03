const Player = require('../Player');
const roomController = require('../roomController');
const { getRandomColor } = require('../../utils/colorGenerator');

const emitEventsAfterJoin = socket => {
  socket.emit('startChatting');

  /**
   * sendRoodId : url 기능 추가를 위한 이벤트. 아직 사용하지 않음
   */
  socket.emit('sendRoomId', { roomId: socket.roomId });
};

const matchHandler = (socket, { nickname }) => {
  const player = new Player({
    nickname,
    socketId: socket.id,
    nicknameColor: getRandomColor(),
  });

  const joinableRoomId = roomController.getJoinableRoomId();
  if (joinableRoomId) {
    roomController.joinRoom({ socket, roomId: joinableRoomId, player });
    /**
     * 새로운 플레이어는 기존 플레이어의 정보들을 전달받고
     * 기존의 플레이어들은 새로운 플레이어의 정보를 전달받는다.
     */
    const room = roomController.getRoomByRoomId(joinableRoomId);
    const otherPlayers = room.gameManager.getOtherPlayers(player.socketId);

    socket.broadcast.to(joinableRoomId).emit('sendNewPlayer', player);
    socket.emit('sendPlayers', { players: otherPlayers });
  } else {
    roomController.createRoom({ socket, roomId: socket.roomId, player });
  }
  emitEventsAfterJoin(socket);
};

module.exports = matchHandler;
