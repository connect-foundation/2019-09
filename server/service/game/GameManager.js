const {
  MAX_ROUND_NUMBER,
  MAX_PEER_CONNECTION_WAITING_TIME,
} = require('../../config');

class GameManager {
  constructor(roomId) {
    this.roomId = roomId;
    this.status = 'waiting';
    this.quiz = '';
    this.players = [];
    this.streamerCandidates = [];
    this.currentRound = 0;
    this.currentSet = 0;
    this.streamer = null;
    this.peerConnectCheckTimer = null;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getStreamer() {
    return this.streamer;
  }

  getPlayers() {
    return this.players;
  }

  getPlayerBySocketId(socketId) {
    return this.players.find(player => player.socketId === socketId);
  }

  getStatus() {
    return this.status;
  }

  /**
   * 인자로 받는 socket id를 제외한 나머지 player를 배열로 반환해주는 함수
   * @param {string} socketId
   */
  getOtherPlayers(socketId) {
    const otherPlayers = this.players.filter(
      player => player.socketId !== socketId,
    );
    return otherPlayers;
  }

  /**
   * 게임이 재시작되더라도 방에 유저는 남아있을 수 있기 때문에
   * players는 초기화하지 않는다.
   */
  reset() {
    this.status = 'waiting';
    this.streamerCandidates = [];
    this.streamer = null;
    this.quiz = '';
    this.currentRound = 0;
    this.currentSet = 0;
  }

  prepareGame() {
    this.reset();
    this.setStreamerCandidates();
    this.status = 'playing';
  }

  prepareSet() {
    this.quiz = '';
    this.updateRoundAndSet();
    this.selectStreamer();
  }

  updateRoundAndSet() {
    const maxSet = this.players.length;
    this.currentSet = this.currentSet < maxSet ? ++this.currentSet : 1;
    if (this.currentSet === 1) this.currentRound++;
  }

  selectStreamer() {
    this.streamer = this.getNextStreamer();
    this.updatePlayersType();
  }

  updatePlayersType() {
    this.players.forEach(player => {
      const type =
        player.socketId !== this.streamer.socketId ? 'viewer' : 'streamer';
      player.setType(type);
    });
  }

  getNextStreamer() {
    const round = this.streamerCandidates[this.currentRound - 1];
    const streamer = round.shift();
    return streamer;
  }

  setStreamerCandidates() {
    for (let i = 0; i < MAX_ROUND_NUMBER; i++) {
      this.streamerCandidates.push([...this.players]);
    }
  }

  leaveRoom(socketId) {
    this.removePlayer(socketId);

    if (this.status !== 'playing') return;

    this.removeStreamerCandidate(socketId);

    if (this.isStreamer(socketId)) {
      this.streamer = null;
    }
  }

  isStreamer(socketId) {
    return this.streamer.socketId === socketId;
  }

  removeStreamerCandidate(socketId) {
    this.streamerCandidates = this.streamerCandidates.map(roundStreamers => {
      return roundStreamers.filter(streamer => streamer.socketId !== socketId);
    });
  }

  removePlayer(socketId) {
    this.players = this.players.filter(player => player.socketId !== socketId);
  }

  getPlayersUnconnectedToStreamer() {
    return this.players.filter(player => !player.getIsConnectedToStreamer());
  }

  startPeerConnectCheckTimer(disconnectPlayersAndStartGame) {
    this.peerConnectCheckTimer = setTimeout(() => {
      const playersToDisconnect = this.getPlayersUnconnectedToStreamer();

      disconnectPlayersAndStartGame(playersToDisconnect, this.roomId);
      this.clearPeerConnectCheckTimer();
    }, MAX_PEER_CONNECTION_WAITING_TIME);
  }

  clearPeerConnectCheckTimer() {
    clearTimeout(this.peerConnectCheckTimer);
    this.peerConnectCheckTimer = null;
  }

  checkAllConnectionsToStreamer() {
    const viewers = this.getOtherPlayers(this.streamer.getSocketId());
    return viewers.every(player => player.getIsConnectedToStreamer());
  }
}

module.exports = GameManager;
