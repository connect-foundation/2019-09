import { useContext } from 'react';
import { DispatchContext } from '../contexts';
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
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.remotePlayers = remotePlayers;
    this.localPlayer = localPlayer;
  }

  findMatch(nickname) {
    this.socket.emit('match', { nickname });
    this.makeAndDispatchViewPlayerList();
  }

  registerSocketEvents() {
    this.socket.on('sendPlayers', this.sendPlayersHandler.bind(this));
    this.socket.on('sendNewPlayer', this.sendNewPlayerHandler.bind(this));
    this.socket.on('sendReady', this.sendReadyHandler.bind(this));
    this.socket.on('startGame', this.startGameHandler.bind(this));
    this.socket.on('prepareSet', this.prepareSetHandler.bind(this));
    this.socket.on(
      'sendCurrentSeconds',
      this.sendCurrentSecondsHandler.bind(this),
    );
  }

  prepareSetHandler({ currentRound, currentSet, quizCandidates }) {
    this.dispatch({
      type: 'setCurrentRound',
      payload: { currentRound },
    });
    this.dispatch({
      type: 'setCurrentSet',
      payload: { currentSet },
    });

    if (quizCandidates.length === 0) {
      this.dispatch({
        type: 'setMessageNotice',
        payload: {
          isVisible: true,
          message: '출제자가 단어를 선택 중입니다.',
        },
      });
    } else {
      this.dispatch({
        type: 'setQuizCandidatesNotice',
        payload: {
          isVisible: true,
          quizCandidates,
        },
      });
    }
  }

  sendCurrentSecondsHandler({ currentSeconds }) {
    console.log('sendCurrentSecondsHandler', currentSeconds);
    this.dispatch({
      type: 'setCurrentSeconds',
      payload: { currentSeconds },
    });
  }

  startGameHandler() {
    this.dispatch({
      type: 'setGameProgress',
      payload: { gameProgress: 'playing' },
    });
  }

  sendPlayersHandler({ players }) {
    players.forEach(player => {
      this.remotePlayers[player.socketId] = player;
    });
    this.makeAndDispatchViewPlayerList();
  }

  /** @todo 매개변수 통합하여 전송하도록 변경 필요 */
  sendNewPlayerHandler({ socketId, nickname, isReady, type, score }) {
    this.remotePlayers[socketId] = { nickname, isReady, type, score };
    this.makeAndDispatchViewPlayerList();
  }

  sendReadyHandler({ socketId, isReady }) {
    if (socketId === this.localPlayer.socketId) {
      this.localPlayer.isReady = isReady;
    } else {
      this.remotePlayers[socketId].isReady = isReady;
    }

    this.makeAndDispatchViewPlayerList();
  }

  toggleReady(isReady) {
    this.socket.emit('sendReady', { isReady: !isReady });
  }

  makeAndDispatchViewPlayerList() {
    const viewPlayerList = makeViewPlayerList(
      this.localPlayer,
      this.remotePlayers,
    );
    this.dispatch({ type: 'setViewPlayerList', payload: { viewPlayerList } });
  }
}

export default GameManager;
