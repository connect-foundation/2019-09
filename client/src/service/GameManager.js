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
  constructor(socket) {
    this.dispatch = useContext(DispatchContext).dispatch;
    this.socket = socket;
    this.playerList = {};
  }

  findMatch(nickname) {
    this.socket.emit('match', { nickname });
  }

  registerSocketEvents() {}
}

export default GameManager;
