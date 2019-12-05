const { io } = require('../../io');
const roomController = require('../roomController');

const connectPeerHandler = socket => {
  const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
  const player = gameManager.getPlayerBySocketId(socket.id);
  player.setIsConnectedToStreamer(true);

  if (gameManager.checkAllConnectionsToStreamer()) {
    /**
     * 연결준비 후 정상 시작
     */
    gameManager.clearPeerConnectCheckTimer();

    io.in(gameManager.getRoomId()).emit('prepareSet', {
      currentRound: gameManager.getCurrentRound(),
      currentSet: gameManager.getCurrentSet(),
      quizCandidates: ['문어', '고양이', '부스트캠퍼'], // getQuizCandidates()
    });

    gameManager.startQuizSelectTimer(currentSeconds => {
      io.in(gameManager.getRoomId()).emit('sendCurrentSeconds', {
        currentSeconds,
      });
    });
  }
};

module.exports = connectPeerHandler;
