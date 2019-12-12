import io from 'socket.io-client';
import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import GameManager from './GameManager';
import StreamingManager from './StreamingManager';
import ChattingManager from './ChattingManager';
import { browserLocalStorage, makeViewPlayerList } from '../utils';
import EVENTS from '../constants/events';
import actions from '../actions';
import { GAME_END_SCOREBOARD_TITLE, SOCKETIO_SERVER_URL } from '../config';

class ClientManager {
  constructor() {
    this.localPlayer = {
      isReady: false,
      nickname: '',
      type: 'viewer',
      socketId: '',
      score: 0,
    };
    this.socket = io(SOCKETIO_SERVER_URL);
    this.remotePlayers = {};
    this.gameManager = new GameManager(
      this.socket,
      this.localPlayer,
      this.remotePlayers,
    );
    this.streamingManager = new StreamingManager(
      this.socket,
      this.remotePlayers,
      this.localPlayer,
    );
    this.chattingManager = new ChattingManager(this.socket);
    this.dispatch = useContext(DispatchContext);
  }

  registerSocketEvents() {
    this.socket.on(EVENTS.SEND_SOCKET_ID, this.sendSocketIdHandler.bind(this));
    this.socket.on(
      EVENTS.SEND_LEFT_PLAYER,
      this.sendLeftPlayerHandler.bind(this),
    );
    this.socket.on(EVENTS.END_GAME, this.endGameHandler.bind(this));
    this.socket.on('resetGame', this.resetGameHandler.bind(this));
  }

  sendLeftPlayerHandler({ socketId }) {
    try {
      delete this.remotePlayers[socketId];
      const viewPlayerList = makeViewPlayerList(
        this.localPlayer,
        this.remotePlayers,
      );
      this.dispatch(actions.setViewPlayerList(viewPlayerList));
      this.streamingManager.closeConnection(socketId);
    } catch (e) {
      console.log(e);
    }
  }

  sendSocketIdHandler({ socketId }) {
    this.localPlayer.socketId = socketId;
  }

  askSocketId() {
    this.socket.emit(EVENTS.ASK_SOCKET_ID);
  }

  findMatch(nickname) {
    this.localPlayer.nickname = nickname;
    this.gameManager.findMatch(nickname);
  }

  toggleReady() {
    this.gameManager.toggleReady(this.localPlayer.isReady);
  }

  init() {
    this.registerSocketEvents();
    this.gameManager.registerSocketEvents();
    this.streamingManager.registerSocketEvents();
    this.askSocketId();
    /** @todo 닉네임 state에서 받아오도록 설정할 것 */
    this.findMatch(browserLocalStorage.getNickname());
    this.chattingManager.registerSocketEvents();
  }

  sendChattingMessage(newChatting) {
    this.chattingManager.sendChattingMessage(newChatting);
  }

  exitRoom() {
    this.streamingManager.resetWebRTC();
    this.socket.disconnect();
    this.dispatch(actions.reset());
  }

  endGameHandler({ scoreList }) {
    this.resetStreaming();
    this.resetReadyButton();
    this.dispatch(actions.clearWindow());
    this.dispatch(
      actions.setScoreNotice({
        isVisible: true,
        message: GAME_END_SCOREBOARD_TITLE,
        scoreList,
      }),
    );
    this.dispatch(actions.setCurrentSeconds(0));
    this.dispatch(actions.setQuiz('', 0));
    this.dispatch(actions.setChattingDisabled(false));
    this.dispatch(actions.setVideoVisibility(false));
    this.streamingManager.closeAllConnections();
  }

  resetReadyButton() {
    const viewPlayerList = makeViewPlayerList(
      this.localPlayer,
      this.remotePlayers,
    );
    this.dispatch(actions.setViewPlayerList(viewPlayerList));
  }

  resetStreaming() {
    this.localPlayer.isReady = false;
    this.streamingManager.resetWebRTC();
  }

  async getMediaPermission() {
    await this.streamingManager.getMediaPermission();
  }

  selectQuiz(quiz) {
    this.gameManager.selectQuiz(quiz);
  }

  /**
   * syncLocalPlayer와 syncRemotePlayers는 추후 utils로 분리 예정
   * remotePlayers 형태를 array 변경과 함께.
   */
  syncLocalPlayer(players) {
    const localPlayer = players.find(player => {
      return player.socketId === this.localPlayer.socketId;
    });
    Object.keys(localPlayer).forEach(key => {
      this.localPlayer[key] = localPlayer[key];
    });
  }

  syncRemotePlayers(players) {
    const remotePlayers = [];
    players.forEach(player => {
      if (player.socketId !== this.localPlayer.socketId) {
        remotePlayers.push(player);
      }
    });
    remotePlayers.forEach(player => {
      const { socketId } = player;
      Object.keys(player).forEach(key => {
        this.remotePlayers[socketId][key] = player[key];
      });
    });
  }

  resetGameHandler({ players }) {
    this.syncLocalPlayer(players);
    this.syncRemotePlayers(players);
    this.gameManager.makeAndDispatchViewPlayerList();
    this.streamingManager.resetWebRTC();
    this.dispatch(actions.clearWindow());
    this.dispatch({
      type: 'setGameStatus',
      payload: { gameStatus: 'waiting' },
    });
  }

  setHistoryInGameManager(history) {
    this.gameManager.setHistory(history);
  }
}

export default ClientManager;
