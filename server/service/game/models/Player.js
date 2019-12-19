const { VIEWER } = require('../../../constants/player');

class Player {
  constructor({ socketId, nickname, nicknameColor }) {
    this.type = VIEWER;
    this.isReady = false;
    this.score = 0;
    this.nickname = nickname;
    this.nicknameColor = nicknameColor;
    this.socketId = socketId;
    this.isConnectedToStreamer = false;
    this.isCorrectPlayer = false;
  }

  reset() {
    this.type = VIEWER;
    this.isReady = false;
    this.score = 0;
    this.isConnectedToStreamer = false;
    this.isCorrectPlayer = false;
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

  getIsCorrectPlayer() {
    return this.isCorrectPlayer;
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

  setIsCorrectPlayer(isCorrectPlayer) {
    this.isCorrectPlayer = isCorrectPlayer;
  }
}
module.exports = Player;
