const { io } = require('../../io');
const {
  MAX_PEER_CONNECTION_WAITING_SECONDS,
  MAX_QUIZ_SELECTION_WAITING_SECONDS,
  ONE_SET_SECONDS,
  SECONDS_BETWEEN_SETS,
  SECONDS_AFTER_GAME_END,
  GAME_INITIALIZING,
  GAME_PLAYING,
  QUIZ_NOT_SELECTED,
} = require('../../../config');
const {
  QuizRepository,
  RankingRepository,
} = require('../../../databaseFiles/repositories');

const quizRepository = new QuizRepository();
const rankingRepository = new RankingRepository();

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

const pickQuizCandidates = async () => {
  const quizCandidates = await quizRepository.findRandomQuizzes();

  const quizWords = quizCandidates.map(quiz => {
    return quiz.word;
  });

  return quizWords;
};

const endSet = (gameManager, timer) => {
  gameManager.getPlayers().forEach(player => {
    player.setIsConnectedToStreamer(false);
  });
  io.in(gameManager.getRoomId()).emit('endSet', {
    scoreList: gameManager.getScoreList(),
  });

  timer.clear();
};

const startSet = (gameManager, timer, quiz) => {
  timer.clear();
  gameManager.setQuiz(quiz);
  gameManager.setStatus(GAME_PLAYING);
  gameManager.getPlayers().forEach(player => {
    const socketId = player.getSocketId();
    io.to(socketId).emit('clearWindow');
    io.to(socketId).emit('startSet', {
      quiz: gameManager.isStreamer(socketId) ? quiz : QUIZ_NOT_SELECTED,
      quizLength: quiz.length,
    });
  });

  timer.startIntegrationTimer(
    ONE_SET_SECONDS,
    repeatSet.bind(null, gameManager, timer),
    sendCurrentSecondsHandler,
  );
};

const quizSelectionTimeoutHandler = (gameManager, timer) => {
  const quiz = gameManager.selectRandomQuiz();
  gameManager.setQuiz(quiz);
  startSet(gameManager, timer, quiz);
};

const prepareSet = async (gameManager, timer) => {
  /**
   * 연결준비 후 응답이 없는 플레이어를 제외하고 시작
   */
  gameManager.setQuiz(QUIZ_NOT_SELECTED);
  /**
   * @todo 추후 DB 연결시 async await 필요
   */
  const quizCandidates = await pickQuizCandidates();
  gameManager.setQuizCandidates(quizCandidates);
  gameManager.setStatus(GAME_INITIALIZING);
  gameManager.getPlayers().forEach(player => {
    const socketId = player.getSocketId();

    io.to(socketId).emit('prepareSet', {
      currentRound: gameManager.getCurrentRound(),
      currentSet: gameManager.getCurrentSet(),
      quizCandidates: gameManager.isStreamer(socketId)
        ? gameManager.getQuizCandidates()
        : [],
    });
  });

  timer.startIntegrationTimer(
    MAX_QUIZ_SELECTION_WAITING_SECONDS,
    quizSelectionTimeoutHandler.bind(null, gameManager, timer),
    sendCurrentSecondsHandler,
  );
};

const disconnectPlayersAndStartGame = (gameManager, timer) => {
  /**
   * 스트리머가 접속을 허용하지 않았을 경우, 스트리머만 내보내고,
   * 아닐 경우, 연결되지 않은 사람들을 내보낸다.
   */
  const streamer = gameManager.getStreamer();
  const playersExceptStreamer = gameManager.getOtherPlayers(
    streamer.getSocketId(),
  );
  const playersToDisconnect = gameManager.getPlayersUnconnectedToStreamer();

  // 스트리머가 카메라 허용을 하지 않았을 경우
  if (playersToDisconnect.length === playersExceptStreamer.length) {
    const socket = io.sockets.connected[streamer.getSocketId()];
    socket.disconnect();
    return;
  }
  // 스트리머 이외의 사람 중 카메라 허용을 안하는 경우가 있을 경우
  playersToDisconnect.forEach(player => {
    const socket = io.sockets.connected[player.getSocketId()];
    socket.disconnect();
  });
  /**
   * 이후에 게임을 진행할 수 있으면, disconnectingHandler쪽에서는 처리하지 않으므로
   * 해당 로직에서 게임을 진행한다.
   */
  if (gameManager.isGameContinuable()) {
    prepareSet(gameManager, timer);
  }
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

const goToNextSet = (gameManager, timer) => {
  io.in(gameManager.getRoomId()).emit('clearWindow');
  preparePlayerTypes(gameManager, timer);
  gameManager.getPlayers().forEach(player => {
    player.setIsCorrectPlayer(false);
  });
  waitForPeerConnection(gameManager, timer);
};

const goToNextSetAfterNSeconds = ({ seconds, gameManager, timer }) => {
  timer.startIntegrationTimer(
    seconds,
    goToNextSet.bind(null, gameManager, timer),
    sendCurrentSecondsHandler,
  );
};

const endGame = async (gameManager, timer) => {
  /**
   * 동시 접근하면 문제 발생
   */
  if (gameManager.getStatus() === 'ending') {
    return;
  }
  gameManager.setStatus('ending');

  const players = gameManager.getPlayers();
  io.in(gameManager.getRoomId()).emit('endGame', {
    scoreList: gameManager.getScoreList(),
  });
  timer.clear();
  await rankingRepository.insertRankings(players);
};

const resetGame = gameManager => {
  /** @todo 점수와 닉네임을 DB에 저장하는 로직 필요 */
  gameManager.reset();
  gameManager.resetAllPlayers();
  io.in(gameManager.getRoomId()).emit('resetGame', {
    players: gameManager.getPlayers(),
  });
};

const resetGameAfterNSeconds = ({ seconds, gameManager, timer }) => {
  timer.startIntegrationTimer(
    seconds,
    resetGame.bind(null, gameManager),
    sendCurrentSecondsHandler,
  );
};

const repeatSet = (gameManager, timer) => {
  gameManager.updateRoundAndSet();
  if (gameManager.isGameContinuable()) {
    endSet(gameManager, timer);
    goToNextSetAfterNSeconds({
      seconds: SECONDS_BETWEEN_SETS,
      gameManager,
      timer,
    });
  } else {
    endGame(gameManager, timer);
    resetGameAfterNSeconds({
      seconds: SECONDS_AFTER_GAME_END,
      gameManager,
      timer,
    });
  }
};

module.exports = {
  prepareGame,
  prepareSet,
  startSet,
  endSet,
  endGame,
  preparePlayerTypes,
  waitForPeerConnection,
  goToNextSet,
  goToNextSetAfterNSeconds,
  resetGameAfterNSeconds,
  repeatSet,
};
