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
    this.socket = io();
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
  }
}

export default ClientManager;
