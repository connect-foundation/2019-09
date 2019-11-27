import io from 'socket.io-client';
import GameManager from './GameManager';
import StreamingManager from './StreamingManager';

class ClientManager {
  constructor() {
    this.localPlayer = {
      isReady: false,
      nickname: '',
      isStreamer: false,
      socketId: '',
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
    );
  }

  registerSocketEvents() {
    this.socket.on('sendSocketId', this.sendSocketIdHandler.bind(this));
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
    this.askSocketId();
    /** @todo 닉네임 state에서 받아오도록 설정할 것 */
    this.findMatch('mike');
  }
}

export default ClientManager;
