// import { useContext } from 'react';
// import { DispatchContext } from '../contexts';

class GameManager {
  /**
   * playerList { player }
   * player {
   *  name
   *  score
   *  isReady
   *  isStreamer
   * }
   */
  constructor(socket, localPlayer, remotePlayers) {
    // this.dispatch = useContext(DispatchContext).dispatch;
    this.socket = socket;
    this.remotePlayers = remotePlayers;
    this.localPlayer = localPlayer;
  }

  findMatch(nickname) {
    this.socket.emit('match', { nickname });
  }

  registerSocketEvents() {
    this.socket.on('sendPlayers', this.sendPlayersHandler.bind(this));
    this.socket.on('sendNewPlayer', this.sendNewPlayerHandler.bind(this));
    this.socket.on('sendReady', this.sendReadyHandler.bind(this));
  }

  sendPlayersHandler({ players }) {
    const socketIds = Object.keys(players);
    socketIds.forEach(socketId => {
      this.remotePlayers[socketId] = players[socketId];
    });
  }

  /** @todo 매개변수 통합하여 전송하도록 변경 필요 */
  sendNewPlayerHandler({ socketId, nickname, isReady, type, score }) {
    this.remotePlayers[socketId] = { nickname, isReady, type, score };
  }

  sendReadyHandler({ socketId, isReady }) {
    if (socketId === this.localPlayer.socketId) {
      this.localPlayer.isReady = isReady;
      return;
    }
    this.remotePlayers[socketId].isReady = isReady;
  }

  toggleReady(isReady) {
    this.socket.emit('sendReady', { isReady: !isReady });
  }
}

export default GameManager;
