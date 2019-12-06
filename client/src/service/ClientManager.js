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

  endGameHandler() {
    this.localPlayer.type = 'viewer';
    this.localPlayer.isReady = false;
    const keys = Object.keys(this.remotePlayers);
    keys.forEach(key => {
      this.remotePlayers[key].type = 'viewer';
      this.remotePlayers[key].isReady = false;
    });

    this.gameManager.makeAndDispatchViewPlayerList();

    this.resetStreaming();
    this.resetReadyButton();
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

  selectQuiz(quiz) {
    this.gameManager.selectQuiz(quiz);
  }
}

export default ClientManager;
