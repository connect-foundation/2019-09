import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import { makeViewPlayerList } from '../utils';
import { WAITING_FOR_STREAMER } from '../config';
import EVENTS from '../constants/events';
import actions from '../actions';
import Timer from './Timer';
import {
  DEFAULT_INACTIVE_PLAYER_BAN_TIME,
  PRIVATE_ROOM_INACTIVE_PLAYER_BAN_TIME,
} from '../constants/timer';

class GameManager {
  constructor({ socket, localPlayer, remotePlayers, isRoomPrivate }) {
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.remotePlayers = remotePlayers;
    this.localPlayer = localPlayer;
    this.timer = new Timer();
    this.isRoomPrivate = isRoomPrivate;
  }

  findMatch({ nickname, roomIdFromUrl, isPrivateRoomCreation }) {
    this.socket.emit(EVENTS.MATCH, {
      nickname,
      roomIdFromUrl,
      isPrivateRoomCreation,
    });
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
    this.socket.on(EVENTS.UPDATE_PROFILE, this.updateProfileHandler.bind(this));
  }

  clearWindowHandler() {
    this.dispatch(actions.clearWindow());
  }

  syncAllPlayers(players) {
    const localPlayer = this.findLocalPlayer(players);
    const remotePlayers = this.findRemotePlayers(players);
    this.syncLocalPlayer(localPlayer);
    this.syncRemotePlayers(remotePlayers);
  }

  findLocalPlayer(players) {
    const localPlayer = players.find(player => {
      return player.socketId === this.localPlayer.socketId;
    });
    return localPlayer;
  }

  findRemotePlayers(players) {
    const remotePlayers = players.filter(player => {
      return player.socketId !== this.localPlayer.socketId;
    });
    return remotePlayers;
  }

  /**
   * syncLocalPlayer와 syncRemotePlayers는 추후 utils로 분리 예정
   * remotePlayers 형태를 array 변경과 함께.
   */
  syncLocalPlayer(localPlayer) {
    Object.keys(localPlayer).forEach(key => {
      this.localPlayer[key] = localPlayer[key];
    });
  }

  syncRemotePlayers(remotePlayers) {
    remotePlayers.forEach(player => {
      const { socketId } = player;
      Object.keys(player).forEach(key => {
        this.remotePlayers[socketId][key] = player[key];
      });
    });
  }

  endSetHandler({ players, currentRound, currentSet, scoreList }) {
    this.syncAllPlayers(players);
    this.makeAndDispatchViewPlayerList();
    this.dispatch(actions.setGameStatus('scoreSharing'));
    this.dispatch(actions.setCurrentSeconds(0));
    this.dispatch(actions.setQuiz('', 0));
    this.dispatch(actions.setChattingDisabled(false));
    this.dispatch(actions.clearWindow());
    this.dispatch(
      actions.setScoreNotice({
        isVisible: true,
        message: `${currentRound} - ${currentSet}`,
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

  updateProfileHandler({ player }) {
    if (player.socketId === this.localPlayer.socketId) {
      this.syncLocalPlayer(player);
    } else {
      // 해당 함수에서 인자를 배열로 받기 때문에 [player]식으로 전달
      this.syncRemotePlayers([player]);
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

  setInactivePlayerBanTimer() {
    const inactivePlayerBanTime = this.isRoomPrivate
      ? PRIVATE_ROOM_INACTIVE_PLAYER_BAN_TIME
      : DEFAULT_INACTIVE_PLAYER_BAN_TIME;
    this.timer.startIntegrationTimer(
      inactivePlayerBanTime,
      this.exitRoom.bind(this),
      () => {
        if (this.localPlayer.isReady) {
          this.timer.clear();
        }
      },
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
