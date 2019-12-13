const { ONE_SECOND } = require('../../../config');

class Timer {
  constructor(roomId) {
    this.roomId = roomId;
    this.timerId = null;
    this.remainingTime = 0;
  }

  /**
   * @param {*} seconds 설정할 타이머 시간
   * @param {*} timeOutCallback 설정한 타이머 시간이 끝난 후 호출될 콜백 함수
   * @param {*} intervalCallback 매초 호출될 콜백 함수
   */
  startIntegrationTimer(seconds, timeOutCallback, intervalCallback) {
    this.remainingTime = seconds;
    const updateTimer = () => {
      intervalCallback(this.remainingTime, this.roomId);
      if (--this.remainingTime < 0) {
        this.clear();
        timeOutCallback();
        return;
      }
      this.timerId = setTimeout(updateTimer, ONE_SECOND);
    };
    this.timerId = setTimeout(updateTimer);
  }

  /**
   * @param {*} seconds 설정할 타이머 시간
   * @param {*} intervalCallback 매초 호출될 콜백 함수
   */
  startIntervalTimer(seconds, intervalCallback) {
    this.remainingTime = seconds;
    const updateTimer = () => {
      if (--this.remainingTime < 0) {
        this.clear();
        return;
      }
      intervalCallback(this.remainingTime, this.roomId);
      this.timerId = setTimeout(updateTimer, ONE_SECOND);
    };
    this.timerId = setTimeout(updateTimer);
  }

  /**
   * @param {*} seconds 설정할 타이머 시간
   * @param {*} timeOutCallback 설정한 타이머 시간이 끝난 후 호출될 콜백 함수
   */
  startTimeoutTimer(seconds, timeOutCallback) {
    this.timerId = setTimeout(() => {
      this.clear();
      timeOutCallback();
    }, seconds * 1000);
  }

  getRemainingTime() {
    return this.remainingTime;
  }

  clear() {
    clearTimeout(this.timerId);
    this.timerId = null;
  }
}

module.exports = Timer;
