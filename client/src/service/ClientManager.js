import io from 'socket.io-client';
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
    this.socket = io(`${window.location.hostname}:3001`);
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
  }

  registerSocketEvents() {
    this.socket.on('sendSocketId', this.sendSocketIdHandler.bind(this));
    this.socket.on('sendLeftPlayer', this.sendLeftPlayerHandler.bind(this));
    this.socket.on('endGame', this.resetStreaming.bind(this));
  }

  sendLeftPlayerHandler({ socketId }) {
    try {
      this.streamingManager.closeConnection(socketId);
      delete this.remotePlayers[socketId];
      /** @todo chatting manager 핸들링 */
      /** @todo view로 dispatch 필요 */
      makeViewPlayerList(this.localPlayer, this.remotePlayers);
    } catch (e) {
      console.log('someone left');
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
  }

  resetStreaming() {
    this.localPlayer.isReady = false;
    this.streamingManager.resetWebRTC();
  }
}

export default ClientManager;
