const { io } = require('../../io');
const {
  MAX_PEER_CONNECTION_WAITING_SECONDS,
  MAX_QUIZ_SELECTION_WAITING_SECONDS,
  ONE_SET_SECONDS,
  SECONDS_BETWEEN_SETS,
  SECONDS_AFTER_GAME_END,
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

const assignViewers = (viewers, streamer) => {
  viewers.forEach(viewer => {
    assignViewer(viewer, streamer);
  });
};

const sendQuizToStreamer = (streamer, quiz) => {
  const streamerSocketId = streamer.getSocketId();
  io.to(streamerSocketId).emit('clearWindow');
  io.to(streamerSocketId).emit('startSet', {
    quiz,
  });
};

const sendQuizLengthToViewers = (viewers, quizLength) => {
  viewers.forEach(viewer => {
    const viewerSocketId = viewer.getSocketId();
    io.to(viewerSocketId).emit('clearWindow');
    io.to(viewerSocketId).emit('startSet', {
      quizLength,
    });
  });
};

const runInGameTimer = (gameManager, timer) => {
  timer.startIntegrationTimer(
    ONE_SET_SECONDS,
    repeatSet.bind(null, gameManager, timer),
    sendCurrentSecondsHandler,
  );
};

const sendEndSet = gameManager => {
  const roomId = gameManager.getRoomId();
  const players = gameManager.getPlayers();
  const currentRound = gameManager.getCurrentRound();
  const currentSet = gameManager.getCurrentSet();
  const scoreList = gameManager.getScoreList();

  io.in(roomId).emit('endSet', {
    players,
    currentRound,
    currentSet,
    scoreList,
  });
};

const sendQuizCandidatesToStreamer = (gameManager, quizCandidates) => {
  const streamer = gameManager.getStreamer();
  const currentRound = gameManager.getCurrentRound();
  const currentSet = gameManager.getCurrentSet();

  io.to(streamer.getSocketId()).emit('prepareSet', {
    currentRound,
    currentSet,
    quizCandidates,
  });
};

const sendEmptyQuizCandidatesToViewers = gameManager => {
  const streamer = gameManager.getStreamer();
  const viewers = gameManager.getOtherPlayers(streamer.getSocketId());
  const currentRound = gameManager.getCurrentRound();
  const currentSet = gameManager.getCurrentSet();
  const quizCandidates = [];

  viewers.forEach(viewer => {
    io.to(viewer.getSocketId()).emit('prepareSet', {
      currentRound,
      currentSet,
      quizCandidates,
    });
  });
};

const startSet = (gameManager, timer, quiz) => {
  timer.clear();
  gameManager.setQuiz(quiz);
  gameManager.setStatus(GAME_PLAYING);

  const streamer = gameManager.getStreamer();
  const viewers = gameManager.getOtherPlayers(streamer.getSocketId());

  sendQuizToStreamer(streamer, quiz);
  sendQuizLengthToViewers(viewers, quiz.length);

  runInGameTimer(gameManager, timer);
};

const quizSelectionTimeoutHandler = (gameManager, timer) => {
  const quiz = gameManager.selectRandomQuiz();
  gameManager.setQuiz(quiz);
  startSet(gameManager, timer, quiz);
};

const runQuizSelectionTimer = (gameManager, timer) => {
  timer.startIntegrationTimer(
    MAX_QUIZ_SELECTION_WAITING_SECONDS,
    quizSelectionTimeoutHandler.bind(null, gameManager, timer),
    sendCurrentSecondsHandler,
  );
};

const disconnectPlayer = player => {
  const socketId = player.getSocketId();
  const socket = io.sockets.connected[socketId];
  socket.disconnect();
};

const disconnectPlayers = players => {
  players.forEach(player => {
    disconnectPlayer(player);
  });
};

const sendReadyPlayersToRoom = (roomId, players) => {
  players.forEach(player => {
    io.in(roomId).emit('sendReady', {
      socketId: player.getSocketId(),
      isReady: player.getIsReady(),
    });
  });
};

const sendStartGameToRoom = roomId => {
  io.in(roomId).emit('startGame');
};

const assignPlayerType = gameManager => {
  const streamer = gameManager.getStreamer();
  const viewers = gameManager.getOtherPlayers(streamer.getSocketId());

  assignStreamer(streamer);
  assignViewers(viewers, streamer);
};

const pickQuizCandidates = async () => {
  const quizzes = await quizRepository.findRandomQuizzes();

  const quizCandidates = quizzes.map(quiz => quiz.word);

  return quizCandidates;
};

const endSet = (gameManager, timer) => {
  timer.clear();
  gameManager.resetStreamerConnectionOfAllPlayers();
  gameManager.resetCorrectionOfAllPlayers();
  sendEndSet(gameManager);
};

const prepareQuizSelection = async (gameManager, timer) => {
  const quizCandidates = await pickQuizCandidates();
  gameManager.setQuizCandidates(quizCandidates);

  sendQuizCandidatesToStreamer(gameManager, quizCandidates);
  sendEmptyQuizCandidatesToViewers(gameManager);

  runQuizSelectionTimer(gameManager, timer);
};

const prepareSet = async (gameManager, timer) => {
  /**
   * 연결준비 후 응답이 없는 플레이어를 제외하고 시작
   */
  gameManager.updateRoundAndSet();
  gameManager.setQuiz(QUIZ_NOT_SELECTED);

  await prepareQuizSelection(gameManager, timer);
};

/**
 * 스트리머가 접속을 허용하지 않았을 경우, 스트리머만 내보내고,
 * 아닐 경우, 연결되지 않은 사람들을 내보낸다.
 * 이후에 게임이 진행 가능하다면, disconnectPlayer쪽에서 처리하지 않기에
 * set를 다시 준비하면서 게임을 진행한다.
 */
const disconnectPlayersAndStartGame = (gameManager, timer) => {
  const streamer = gameManager.getStreamer();
  const viewers = gameManager.getOtherPlayers(streamer.getSocketId());

  const playersToDisconnect = gameManager.getPlayersUnconnectedToStreamer();

  const isAllPlayerDisconnected = playersToDisconnect.length === viewers.length;

  if (isAllPlayerDisconnected) {
    disconnectPlayer(streamer);
    return;
  }

  disconnectPlayers(playersToDisconnect);

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
  const roomId = gameManager.getRoomId();
  const players = gameManager.getPlayers();

  gameManager.cancelReadyAllPlayers();
  sendReadyPlayersToRoom(roomId, players);

  gameManager.prepareGame();
  sendStartGameToRoom(roomId);

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
  resetGameAfterNSeconds,
  repeatSet,
};
