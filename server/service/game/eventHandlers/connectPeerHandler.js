const { io } = require('../../io');
const roomController = require('../roomController');

const connectPeerHandler = socket => {
  const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
  const connectedPlayer = gameManager.getPlayerBySocketId(socket.id);
  connectedPlayer.setIsConnectedToStreamer(true);

  if (gameManager.checkAllConnectionsToStreamer()) {
    /**
     * 연결준비 후 정상 시작
     */
    gameManager.clearPeerConnectCheckTimer();

    gameManager.getPlayers().forEach(player => {
      const socketId = player.getSocketId();

      io.to(socketId).emit('prepareSet', {
        currentRound: gameManager.getCurrentRound(),
        currentSet: gameManager.getCurrentSet(),
        quizCandidates: gameManager.isStreamer(socketId)
          ? ['문어', '고양이', '부스트캠퍼']
          : [], // getQuizCandidates()
      });
    });

    gameManager.startQuizSelectTimer(currentSeconds => {
      io.in(gameManager.getRoomId()).emit('sendCurrentSeconds', {
        currentSeconds,
      });
    });
  }
};

module.exports = connectPeerHandler;
