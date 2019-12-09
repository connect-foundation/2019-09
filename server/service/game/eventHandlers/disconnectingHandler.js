const { io } = require('../../io');
const roomController = require('../controllers/roomController');
const { MIN_PLAYER_COUNT } = require('../../../config');

const assignStreamer = streamer => {
  io.to(streamer.socketId).emit('assignStreamer');
};

const assignViewer = (viewer, streamer) => {
  io.to(viewer.socketId).emit('assignViewer', {
    streamerSocketId: streamer.socketId,
  });
};
const sendReady = (roomId, player) => {
  io.in(roomId).emit('sendReady', {
    socketId: player.getSocketId(),
    isReady: player.getIsReady(),
  });
};

const isRoomReady = gameManager => {
  const players = gameManager.getPlayers();
  return players.every(player => player.getIsReady());
};

const assignPlayerType = gameManager => {
  const streamer = gameManager.getStreamer();
  const viewers = gameManager.getOtherPlayers(streamer.getSocketId());

  assignStreamer(streamer);
  viewers.forEach(viewer => {
    assignViewer(viewer, streamer);
  });
};

// const emit

const disconnectPlayersAndStartGame = (players, gameManager) => {
  players.forEach(player => {
    const socket = io.sockets.connected[player.getSocketId()];
    socket.disconnect();
    // disconnectingHandler에서 gameManager의 player를 지워줘야함
  });
  /**
   * 연결준비 후 응답이 없는 플레이어를 제외하고 시작
   */
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
};

const disconnectingHandler = socket => {
  try {
    const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
    gameManager.leaveRoom(socket.id);
    socket.leave(gameManager.getRoomId());

    io.in(gameManager.getRoomId()).emit('sendLeftPlayer', {
      socketId: socket.id,
    });

    if (gameManager.getStatus() === 'waiting') {
      const playerCount = gameManager.getPlayers().length;

      if (isRoomReady(gameManager) && playerCount >= MIN_PLAYER_COUNT) {
        gameManager.cancelReadyAllPlayers();
        gameManager
          .getPlayers()
          .forEach(sendReady.bind(null, gameManager.getRoomId()));

        gameManager.prepareGame();
        io.in(gameManager.getRoomId()).emit('startGame');

        gameManager.prepareSet();
        assignPlayerType(gameManager);
        gameManager.startPeerConnectCheckTimer(disconnectPlayersAndStartGame);
      }
      return;
    }
    if (gameManager.getStatus() === 'initializing') {
      if (
        !gameManager.getStreamer() ||
        gameManager.getPlayers().length < MIN_PLAYER_COUNT
      ) {
        io.in(gameManager.getRoomId()).emit('endSet', {
          scoreList: gameManager.getScoreList(),
        });
        gameManager.reset();
        gameManager.resetAllPlayers();
      }
    }
    if (
      (gameManager.getStatus() === 'playing' && !gameManager.getStreamer()) ||
      gameManager.getPlayers().length < MIN_PLAYER_COUNT
    ) {
      io.in(gameManager.getRoomId()).emit('endSet', {
        scoreList: gameManager.getScoreList(),
      });
      gameManager.reset();
      gameManager.resetAllPlayers();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = disconnectingHandler;
