const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const { GAME_INITIALIZING, QUIZ_NOT_SELECTED } = require('../../../config');

const isGameInitializing = status => {
  return status === GAME_INITIALIZING;
};

const quizNotSelected = quiz => {
  return quiz === QUIZ_NOT_SELECTED;
};

const isQuizInQuizCandidates = (quizCandidates, quiz) => {
  return quizCandidates.find(quizCandidate => {
    return quizCandidate === quiz;
  });
};

const selectQuizHandler = (socket, { quiz }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  /**
   * 게임의 상태가 단어 선택 단계인지,
   * 퀴즈의 단어가 선택됐는지,
   * 마지막으로 퀴즈의 단어가 목록에 있는지 확인하는 로직
   */
  if (
    isGameInitializing(gameManager.getStatus()) &&
    quizNotSelected(gameManager.getQuiz()) &&
    isQuizInQuizCandidates(gameManager.getQuizCandidates(), quiz)
  ) {
    gameController.startSet(gameManager, timer, quiz);
  }
};

module.exports = selectQuizHandler;
