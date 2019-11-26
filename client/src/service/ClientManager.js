import io from 'socket.io-client';
import GameManager from './GameManager';
import StreamingManager from './StreamingManager';

class ClientManager {
  constructor() {
    this.socketId = null;
    this.socket = io();
    this.otherPlayers = {};
    this.gameManager = new GameManager(this.socket, this.otherPlayers);
    this.streamingManager = new StreamingManager(
      this.socket,
      this.otherPlayers,
    );
  }

  registerSocketEvents() {
    this.socket.on('sendSocketId', this.sendSocketIdHandler.bind(this));
  }

  sendSocketIdHandler({ socketId }) {
    this.socketId = socketId;
  }

  askSocketId() {
    this.socket.emit('askSocketId');
  }

  init() {
    this.registerSocketEvents();
    this.askSocketId();
  }
}

export default ClientManager;
