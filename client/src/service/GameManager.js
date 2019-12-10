import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import { makeViewPlayerList } from '../utils';

class GameManager {
  constructor(socket, localPlayer, remotePlayers) {
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.remotePlayers = remotePlayers;
    this.localPlayer = localPlayer;
    this.quizSelectTimer = null;
  }

  findMatch(nickname) {
    this.socket.emit('match', { nickname });
    this.makeAndDispatchViewPlayerList();
  }

  registerSocketEvents() {
    this.socket.on('sendPlayers', this.sendPlayersHandler.bind(this));
    this.socket.on('sendNewPlayer', this.sendNewPlayerHandler.bind(this));
    this.socket.on('sendReady', this.sendReadyHandler.bind(this));
    this.socket.on('startGame', this.startGameHandler.bind(this));
    this.socket.on('prepareSet', this.prepareSetHandler.bind(this));
    this.socket.on(
      'sendCurrentSeconds',
      this.sendCurrentSecondsHandler.bind(this),
    );
    this.socket.on('startSet', this.startSetHandler.bind(this));
    this.socket.on('correctAnswer', this.correctAnswerHandler.bind(this));
    this.socket.on('endSet', this.endSetHandler.bind(this));
    this.socket.on('disconnect', () => {
      // 데모데이 중 서버의 지속적인 다운을 대처하기 위해 '임시'로 작성함
      window.location.href = '/';
      // this.dispatch({ type: 'reset' });
    });
    this.socket.on('clearWindow', this.clearWindowHandler.bind(this));
  }

  clearWindowHandler() {
    this.dispatch({
      type: 'clearWindow',
    });
  }

  endSetHandler({ scoreList }) {
    this.dispatch({
      type: 'setGameStatus',
      payload: { gameStatus: 'scoreSharing' },
    });
    this.dispatch({
      type: 'setCurrentSeconds',
      payload: { currentSeconds: 0 },
    });
    this.dispatch({
      type: 'setQuiz',
      payload: {
        quiz: '',
        quizLength: 0,
      },
    });
    this.dispatch({
      type: 'setIsChattingDisabled',
      payload: {
        isChattingDisabled: false,
      },
    });
    this.dispatch({
      type: 'setScoreNotice',
      payload: {
        isVisible: true,
        message: '최종 점수',
        scoreList,
      },
    });
    this.dispatch({
      type: 'setIsVideoVisible',
      payload: {
        isVideoVisible: false,
      },
    });
  }

  correctAnswerHandler() {
    this.dispatch({
      type: 'setIsChattingDisabled',
      payload: {
        isChattingDisabled: true,
      },
    });
    this.dispatch({
      type: 'setIsChattingDisabled',
      payload: {
        isChattingDisabled: true,
      },
    });
  }

  startSetHandler({ quiz, quizLength }) {
    this.dispatch({
      type: 'setQuiz',
      payload: {
        quiz,
        quizLength,
      },
    });
    this.dispatch({
      type: 'setIsVideoVisible',
      payload: {
        isVideoVisible: true,
      },
    });
  }

  prepareSetHandler({ currentRound, currentSet, quizCandidates }) {
    this.dispatch({
      type: 'setCurrentRound',
      payload: { currentRound },
    });
    this.dispatch({
      type: 'setCurrentSet',
      payload: { currentSet },
    });

    if (quizCandidates.length === 0) {
      this.dispatch({
        type: 'setMessageNotice',
        payload: {
          isVisible: true,
          message: '출제자가 단어를 선택 중입니다.',
        },
      });
    } else {
      this.dispatch({
        type: 'setQuizCandidatesNotice',
        payload: {
          isVisible: true,
          quizCandidates,
        },
      });

      this.quizSelectTimer = setTimeout(() => {
        const randomIndex = Math.round(
          Math.random() * (quizCandidates.length - 1),
        );

        const quiz = quizCandidates[randomIndex];
        this.selectQuiz(quiz);
      }, 10000);
    }
  }

  sendCurrentSecondsHandler({ currentSeconds }) {
    this.dispatch({
      type: 'setCurrentSeconds',
      payload: { currentSeconds },
    });
  }

  startGameHandler() {
    this.dispatch({
      type: 'setGameStatus',
      payload: { gameStatus: 'playing' },
    });
  }

  sendPlayersHandler({ players }) {
    players.forEach(player => {
      this.remotePlayers[player.socketId] = player;
    });
    this.makeAndDispatchViewPlayerList();
  }

  /** @todo 매개변수 통합하여 전송하도록 변경 필요 */
  sendNewPlayerHandler({ socketId, nickname, isReady, type, score }) {
    this.remotePlayers[socketId] = { nickname, isReady, type, score };
    this.makeAndDispatchViewPlayerList();
  }

  sendReadyHandler({ socketId, isReady }) {
    if (socketId === this.localPlayer.socketId) {
      this.localPlayer.isReady = isReady;
    } else {
      this.remotePlayers[socketId].isReady = isReady;
    }

    this.makeAndDispatchViewPlayerList();
  }

  toggleReady(isReady) {
    this.socket.emit('sendReady', { isReady: !isReady });
  }

  makeAndDispatchViewPlayerList() {
    const viewPlayerList = makeViewPlayerList(
      this.localPlayer,
      this.remotePlayers,
    );
    this.dispatch({ type: 'setViewPlayerList', payload: { viewPlayerList } });
  }

  selectQuiz(quiz) {
    this.dispatch({
      type: 'setQuizCandidatesNotice',
      payload: {
        isVisible: false,
        quizCandidates: [],
      },
    });
    this.socket.emit('selectQuiz', { quiz });
    clearTimeout(this.quizSelectTimer);
    this.quizSelectTimer = null;
  }
}

export default GameManager;
