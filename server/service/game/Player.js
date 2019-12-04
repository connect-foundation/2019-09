class Player {
  constructor({ socketId, nickname, nicknameColor }) {
    this.type = 'viewer';
    this.isReady = false;
    this.score = 0;
    this.nickname = nickname;
    this.nicknameColor = nicknameColor;
    /**
     * Player 클래스를 포함하는 클래스에 있을수도있음
     */
    this.socketId = socketId;
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

  setIsReady(isReady) {
    this.isReady = isReady;
  }

  setType(type) {
    this.type = type;
  }

  setScore(score) {
    this.score = score;
  }
}
module.exports = Player;
