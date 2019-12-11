import io from 'socket.io-client';
import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import GameManager from './GameManager';
import StreamingManager from './StreamingManager';
import ChattingManager from './ChattingManager';
import { browserLocalStorage, makeViewPlayerList } from '../utils';

class ClientManager {
  constructor() {
    this.localPlayer = {
      isReady: false,
      nickname: '',
      type: 'viewer',
      socketId: '',
      score: 0,
    };
    /** @todo 이후에 지워야 할 사항. 개발용 */
    this.socket = io('localhost:3001');
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
    this.socket.on('sendSocketId', this.sendSocketIdHandler.bind(this));
    this.socket.on('sendLeftPlayer', this.sendLeftPlayerHandler.bind(this));
    this.socket.on('endGame', this.endGameHandler.bind(this));
    this.socket.on('resetGame', this.resetGameHandler.bind(this));
  }

  sendLeftPlayerHandler({ socketId }) {
    try {
      delete this.remotePlayers[socketId];
      const viewPlayerList = makeViewPlayerList(
        this.localPlayer,
        this.remotePlayers,
      );
      this.dispatch({
        type: 'setViewPlayerList',
        payload: {
          viewPlayerList,
        },
      });
      console.log('sendLeftPlayerHandler : ', socketId, viewPlayerList);
      this.streamingManager.closeConnection(socketId);
    } catch (e) {
      console.log(e);
    }
  }

  sendSocketIdHandler({ socketId }) {
    this.localPlayer.socketId = socketId;
  }

  askSocketId() {
    this.socket.emit('askSocketId');
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
    // this.dispatch({ type: 'resetChattingList' });
    this.dispatch({ type: 'reset' });
    // 상태 초기화
  }

  endGameHandler({ scoreList }) {
    this.resetStreaming();
    this.resetReadyButton();
    this.dispatch({
      type: 'setScoreNotice',
      payload: {
        isVisible: true,
        message: '최종 점수',
        scoreList,
      },
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
      type: 'setIsVideoVisible',
      payload: {
        isVideoVisible: false,
      },
    });
    this.streamingManager.closeAllConnections();
  }

  resetReadyButton() {
    const viewPlayerList = makeViewPlayerList(
      this.localPlayer,
      this.remotePlayers,
    );
    this.dispatch({ type: 'setViewPlayerList', payload: { viewPlayerList } });
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
    this.dispatch({
      type: 'clearWindow',
    });
    this.dispatch({
      type: 'setGameStatus',
      payload: { gameStatus: 'waiting' },
    });
  }
}

export default ClientManager;
