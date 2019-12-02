const { INITIAL_PLAYER_STATUS } = require('../../config');

/**
 * 비어있는 player객체 생성
 * obj에 key값과 value를 넣으면 player에 그 값을 넣습니다.
 */
const createPlayer = obj => {
  const player = { ...INITIAL_PLAYER_STATUS };
  const keys = Object.keys(obj);
  keys.forEach(key => {
    player[key] = obj[key];
  });
  return player;
};

module.exports = createPlayer;
