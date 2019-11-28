// import { useContext } from 'react';
// import { DispatchContext } from '../contexts';
import { makeViewPlayerList } from '../utils';

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
    /**
     * @todo 좌측 플레이어리스트 렌더링을 위한 viewPlayerList 배열을 dispatch
     * dispatch의 payload로 사용
     */
    makeViewPlayerList(this.localPlayer, this.remotePlayers);
  }

  /** @todo 매개변수 통합하여 전송하도록 변경 필요 */
  sendNewPlayerHandler({ socketId, nickname, isReady, type, score }) {
    this.remotePlayers[socketId] = { nickname, isReady, type, score };
    /**
     * @todo 좌측 플레이어리스트 렌더링을 위한 viewPlayerList 배열을 dispatch
     * dispatch의 payload로 사용
     */
    makeViewPlayerList(this.localPlayer, this.remotePlayers);
  }

  sendReadyHandler({ socketId, isReady }) {
    if (socketId === this.localPlayer.socketId) {
      this.localPlayer.isReady = isReady;
      return;
    }
    this.remotePlayers[socketId].isReady = isReady;
    /**
     * @todo 좌측 플레이어리스트 렌더링을 위한 viewPlayerList 배열을 dispatch
     * dispatch의 payload로 사용
     */
    makeViewPlayerList(this.localPlayer, this.remotePlayers);
  }

  toggleReady(isReady) {
    this.socket.emit('sendReady', { isReady: !isReady });
  }
}

export default GameManager;
