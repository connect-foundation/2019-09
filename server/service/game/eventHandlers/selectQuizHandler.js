const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const { INITIALIZING } = require('../../../constants/gameStatus');
const { DEFAULT_QUIZ } = require('../../../constants/gameRule');

const isGameInitializing = status => {
  return status === INITIALIZING;
};

const quizNotSelected = quiz => {
  return quiz === DEFAULT_QUIZ;
};

const isQuizInQuizCandidates = (quizCandidates, quiz) => {
  return quizCandidates.find(quizCandidate => {
    return quizCandidate === quiz;
  });
};

const selectQuizHandler = (socket, { quiz }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  /**
   * 전송자가 스트리머인지,
   * 게임의 상태가 단어 선택 단계인지,
   * 퀴즈의 단어가 선택됐는지,
   * 마지막으로 퀴즈의 단어가 목록에 있는지 확인하는 로직
   */
  if (
    gameManager.isStreamer(socket.id) &&
    isGameInitializing(gameManager.getStatus()) &&
    quizNotSelected(gameManager.getQuiz()) &&
    isQuizInQuizCandidates(gameManager.getQuizCandidates(), quiz)
  ) {
    gameController.startSet(gameManager, timer, quiz);
  }
};

module.exports = selectQuizHandler;
