const { io } = require('../../io');
const {
  MAX_PEER_CONNECTION_WAITING_SECONDS,
  MAX_QUIZ_SELECTION_WAITING_SECONDS,
  ONE_SET_SECONDS,
} = require('../../../config');

const sendCurrentSecondsHandler = (currentSeconds, roomId) => {
  io.in(roomId).emit('sendCurrentSeconds', {
    currentSeconds,
  });
};

const assignStreamer = streamer => {
  io.to(streamer.socketId).emit('assignStreamer');
};

const assignViewer = (viewer, streamer) => {
  io.to(viewer.socketId).emit('assignViewer', {
    streamerSocketId: streamer.socketId,
  });
};

const assignPlayerType = gameManager => {
  const streamer = gameManager.getStreamer();
  const viewers = gameManager.getOtherPlayers(streamer.getSocketId());

  assignStreamer(streamer);
  viewers.forEach(viewer => {
    assignViewer(viewer, streamer);
  });
};

const prepareSet = (gameManager, timer) => {
  /**
   * 연결준비 후 응답이 없는 플레이어를 제외하고 시작
   */
  gameManager.setQuiz('');
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

  timer.startIntervalTimer(
    MAX_QUIZ_SELECTION_WAITING_SECONDS,
    sendCurrentSecondsHandler,
  );
};

const disconnectPlayersAndStartGame = (gameManager, timer) => {
  const playersToDisconnect = gameManager.getPlayersUnconnectedToStreamer();
  playersToDisconnect.forEach(player => {
    const socket = io.sockets.connected[player.getSocketId()];
    socket.disconnect();
  });

  prepareSet(gameManager, timer);
};

const waitForPeerConnection = (gameManager, timer) => {
  timer.startTimeoutTimer(
    MAX_PEER_CONNECTION_WAITING_SECONDS,
    disconnectPlayersAndStartGame.bind(null, gameManager, timer),
  );
};

const preparePlayerTypes = gameManager => {
  gameManager.selectStreamer();
  assignPlayerType(gameManager);
};

const prepareGame = (gameManager, timer) => {
  gameManager.cancelReadyAllPlayers();
  gameManager.getPlayers().forEach(player => {
    io.in(gameManager.getRoomId()).emit('sendReady', {
      socketId: player.getSocketId(),
      isReady: player.getIsReady(),
    });
  });

  gameManager.prepareGame();
  io.in(gameManager.getRoomId()).emit('startGame');

  gameManager.updateRoundAndSet();
  preparePlayerTypes(gameManager);
  waitForPeerConnection(gameManager, timer);
};

const endSet = (gameManager, timer) => {
  io.in(gameManager.getRoomId()).emit('endSet', {
    scoreList: gameManager.getScoreList(),
  });

  timer.clear();
};

const startSet = (gameManager, timer, quiz) => {
  timer.clear();
  gameManager.setQuiz(quiz);
  gameManager.setStatus('playing');
  gameManager.getPlayers().forEach(player => {
    const socketId = player.getSocketId();

    io.to(socketId).emit('startSet', {
      quiz: gameManager.isStreamer(socketId) ? quiz : '',
      quizLength: quiz.length,
    });
  });

  timer.startIntegrationTimer(
    ONE_SET_SECONDS,
    endSet.bind(null, gameManager, timer),
    sendCurrentSecondsHandler,
  );
};

const goToNextSet = (gameManager, timer) => {
  io.in(gameManager.getRoomId()).emit('clearWindow');
  preparePlayerTypes(gameManager, timer);
  waitForPeerConnection(gameManager, timer);
};

module.exports = {
  prepareGame,
  prepareSet,
  startSet,
  endSet,
  preparePlayerTypes,
  waitForPeerConnection,
  goToNextSet,
};
