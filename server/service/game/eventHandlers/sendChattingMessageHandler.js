const short = require('short-uuid');
const { io } = require('../../io');
const { processChatWithSystemRule } = require('../../../utils/chatUtils');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const chattingController = require('../controllers/chattingController');

const sendChattingMessageHandler = (socket, { message }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  const roomId = gameManager.getRoomId();
  const player = gameManager.getPlayerBySocketId(socket.id);
  const playerNickname = player.getNickname();
  const playerNicknameColor = player.getNicknameColor();
  let payload = { id: short.generate() };

  if (gameController.isCorrectPlayer(player)) return;

  if (
    gameController.isCorrectAnswer(gameManager, message, socket.id) &&
    gameController.isGameStatusPlaying(gameManager) &&
    gameController.isSentByViewer(gameManager, socket.id)
  ) {
    const score = gameController.generateScoreWithRemainingTime(player, timer);
    gameController.setPlayerScore(player, score);
    gameController.setIsCorrectPlayer(player, true);
    gameController.sendCorrectAnswerEventToPlayer(socket.id, io);
    gameController.sendUpdateProfileToRoom(socket.roomId, { player });

    payload = chattingController.generateCorrectionNotice(
      payload,
      playerNickname,
    );
    chattingController.sendChattingMessageToRoom(io, roomId, payload);

    if (gameController.checkAllPlayersAreCorrect(gameManager)) {
      gameController.repeatSet(gameManager, timer);
    }
    return;
  }

  payload.nickname = playerNickname;
  payload.nicknameColor = playerNicknameColor;
  payload.message = processChatWithSystemRule(message);
  chattingController.sendChattingMessageToRoom(io, roomId, payload);
};

module.exports = sendChattingMessageHandler;
