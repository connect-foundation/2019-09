const { io } = require('../../io');

const roomController = require('../roomController');
const { MIN_PLAYER_COUNT } = require('../../../config');

const assignStreamer = streamer => {
  io.to(streamer.socketId).emit('assignStreamer');
};

const assignViewer = (viewer, streamer) => {
  io.to(viewer.socketId).emit('assignViewer', {
    streamerSocketId: streamer.socketId,
  });
};
const sendReady = ({ roomId, socketId, isReady }) => {
  io.in(roomId).emit('sendReady', { socketId, isReady });
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

const disconnectPlayersAndStartGame = (players, gameManager) => {
  players.forEach(player => {
    const socket = io.sockets.connected[player.getSocketId()];
    socket.disconnect();
    // disconnectingHandler에서 gameManager의 player를 지워줘야함
  });
  /**
   * 연결준비 후 응답이 없는 플레이어를 제외하고 시작
   */
  io.in(gameManager.roomId).emit('prepareSet', {
    currentRound: gameManager.getCurrentRound(),
    currentSet: gameManager.getCurrentSet(),
    quizCandidates: ['문어', '고양이', '부스트캠퍼'], // getQuizCandidates()
  });

  gameManager.startQuizSelectTimer(currentSeconds => {
    io.in(gameManager.getRoomId()).emit('sendCurrentSeconds', {
      currentSeconds,
    });
  });
};

const sendReadyHandler = (socket, { isReady }) => {
  const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
  const playerCount = gameManager.getPlayers().length;

  if (gameManager.status === 'playing') return;

  const player = gameManager.getPlayerBySocketId(socket.id);
  player.setIsReady(isReady);

  sendReady({
    roomId: gameManager.getRoomId(),
    socketId: player.socketId,
    isReady,
  });

  if (isRoomReady(gameManager) && playerCount >= MIN_PLAYER_COUNT) {
    gameManager.prepareGame();
    io.in(gameManager.getRoomId()).emit('startGame');

    // 세트마다 해줘야함
    // '연결준비'
    gameManager.prepareSet();
    assignPlayerType(gameManager);
    gameManager.startPeerConnectCheckTimer(disconnectPlayersAndStartGame);
  }
};

module.exports = sendReadyHandler;
