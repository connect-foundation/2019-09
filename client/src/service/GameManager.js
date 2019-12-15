import { useContext } from 'react';
import { DispatchContext, GlobalContext } from '../contexts';
import { makeViewPlayerList } from '../utils';
import { WAITING_FOR_STREAMER } from '../config';
import EVENTS from '../constants/events';
import actions from '../actions';
import Timer from './Timer';
import { INACTIVE_PLAYER_BAN_TIME } from '../constants/timer';
import { useToast } from '../hooks';
import { TOAST_TPYES, TOAST_MESSAGE } from '../constants/toast';

class GameManager {
  constructor(socket, localPlayer, remotePlayers) {
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.remotePlayers = remotePlayers;
    this.localPlayer = localPlayer;
    this.timer = new Timer();
    const { toast } = useContext(GlobalContext);
    this.toast = toast;
  }

  findMatch(nickname) {
    this.socket.emit(EVENTS.MATCH, { nickname });
    this.makeAndDispatchViewPlayerList();
  }

  registerSocketEvents() {
    this.socket.on(EVENTS.SEND_PLAYERS, this.sendPlayersHandler.bind(this));
    this.socket.on(
      EVENTS.SEND_NEW_PLAYER,
      this.sendNewPlayerHandler.bind(this),
    );
    this.socket.on(EVENTS.SEND_READY, this.sendReadyHandler.bind(this));
    this.socket.on(EVENTS.START_GAME, this.startGameHandler.bind(this));
    this.socket.on(EVENTS.PREPARE_SET, this.prepareSetHandler.bind(this));
    this.socket.on(
      EVENTS.SEND_CURRENT_SECONDS,
      this.sendCurrentSecondsHandler.bind(this),
    );
    this.socket.on(EVENTS.START_SET, this.startSetHandler.bind(this));
    this.socket.on(EVENTS.CORRECT_ANSWER, this.correctAnswerHandler.bind(this));
    this.socket.on(EVENTS.END_SET, this.endSetHandler.bind(this));
    this.socket.on(EVENTS.CLEAR_WINDOW, this.clearWindowHandler.bind(this));
    this.socket.on(
      EVENTS.UPDATE_PROFILE_SCORE,
      this.updateProfileScoreHandler.bind(this),
    );
  }

  clearWindowHandler() {
    this.dispatch(actions.clearWindow());
  }

  endSetHandler({ scoreList }) {
    this.dispatch(actions.setGameStatus('scoreSharing'));
    this.dispatch(actions.setCurrentSeconds(0));
    this.dispatch(actions.setQuiz('', 0));
    this.dispatch(actions.setChattingDisabled(false));
    this.dispatch(actions.clearWindow());
    this.dispatch(
      actions.setScoreNotice({
        isVisible: true,
        message: '중간 점수',
        scoreList,
      }),
    );
    this.dispatch(actions.setVideoVisibility(false));
  }

  correctAnswerHandler() {
    this.dispatch(actions.setChattingDisabled(true));
  }

  startSetHandler({ quiz, quizLength }) {
    this.dispatch(actions.setQuiz(quiz, quizLength));
    this.dispatch(actions.setVideoVisibility(true));
  }

  prepareSetHandler({ currentRound, currentSet, quizCandidates }) {
    this.dispatch(actions.setCurrentRound(currentRound));
    this.dispatch(actions.setCurrentSet(currentSet));

    if (quizCandidates.length === 0) {
      this.dispatch(actions.setMessageNotice(true, WAITING_FOR_STREAMER));
    } else {
      this.dispatch(actions.setQuizCandidatesNotice(true, quizCandidates));
    }
  }

  sendCurrentSecondsHandler({ currentSeconds }) {
    this.dispatch(actions.setCurrentSeconds(currentSeconds));
  }

  startGameHandler() {
    this.timer.clear();
    this.dispatch(actions.setGameStatus('playing'));
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

  updateProfileScoreHandler({ player }) {
    if (player.socketId === this.localPlayer.socketId) {
      this.localPlayer.score = player.score;
    } else {
      this.remotePlayers[player.socketId].score = player.score;
    }
    this.makeAndDispatchViewPlayerList();
  }

  sendReadyHandler({ socketId, isReady }) {
    if (socketId === this.localPlayer.socketId) {
      this.localPlayer.isReady = isReady;
      this.toggleInactivePlayerBanTimer();
    } else {
      this.remotePlayers[socketId].isReady = isReady;
    }

    this.makeAndDispatchViewPlayerList();
  }

  toggleReady(isReady) {
    this.socket.emit(EVENTS.SEND_READY, { isReady: !isReady });
  }

  makeAndDispatchViewPlayerList() {
    const viewPlayerList = makeViewPlayerList(
      this.localPlayer,
      this.remotePlayers,
    );
    this.dispatch(actions.setViewPlayerList(viewPlayerList));
  }

  selectQuiz(quiz) {
    this.dispatch(actions.setQuizCandidatesNotice(false, []));
    this.socket.emit(EVENTS.SELECT_QUIZ, { quiz });
  }

  inactivePlayerBanHandler() {
    this.exitRoom();
    useToast({
      dispatch: this.dispatch,
      toastType: TOAST_TPYES.INFORMATION,
      open: this.toast.open,
      message: TOAST_MESSAGE.INACTIVE_PLAYER_BAN,
    });
  }

  inactivePlayerWarningHandler(time) {
    if (this.localPlayer.isReady) {
      this.timer.clear();
    }
    if (time === INACTIVE_PLAYER_BAN_TIME / 2) {
      useToast({
        dispatch: this.dispatch,
        toastType: TOAST_TPYES.WARNING,
        open: this.toast.open,
        message: TOAST_MESSAGE.INACTIVE_PLAYER_WARNING(time),
      });
    }
  }

  setInactivePlayerBanTimer() {
    this.timer.startIntegrationTimer(
      INACTIVE_PLAYER_BAN_TIME,
      this.inactivePlayerBanHandler.bind(this),
      this.inactivePlayerWarningHandler.bind(this),
    );
  }

  exitRoom() {
    this.socket.disconnect();
    this.dispatch(actions.setClientManagerInitialized(false));
  }

  toggleInactivePlayerBanTimer() {
    if (this.localPlayer.isReady) {
      this.timer.clear();
    } else {
      this.setInactivePlayerBanTimer();
    }
  }
}

export default GameManager;
