class Player {
  constructor({ socketId, nickname, nicknameColor }) {
    this.type = 'viewer';
    this.isReady = false;
    this.score = 0;
    this.nickname = nickname;
    this.nicknameColor = nicknameColor;
    this.socketId = socketId;
    this.isConnectedToStreamer = false;
  }

  getNickname() {
    return this.nickname;
  }

  getNicknameColor() {
    return this.nicknameColor;
  }

  getScore() {
    return this.score;
  }

  getType() {
    return this.type;
  }

  getIsReady() {
    return this.isReady;
  }

  getSocketId() {
    return this.socketId;
  }

  getIsConnectedToStreamer() {
    return this.isConnectedToStreamer;
  }

  setIsReady(isReady) {
    this.isReady = isReady;
  }

  setType(type) {
    this.type = type;
  }

  setScore(score) {
    this.score = score;
  }

  setIsConnectedToStreamer(isConnectedToStreamer) {
    this.isConnectedToStreamer = isConnectedToStreamer;
  }
}
module.exports = Player;
