import { useContext } from 'react';
import { DispatchContext } from '../contexts';

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
    this.dispatch = useContext(DispatchContext).dispatch;
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
    this.remotePlayers = players;
  }

  sendNewPlayerHandler({ socketId, nickname }) {
    this.remotePlayers = { ...this.remotePlayers, [socketId]: { nickname } };
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
