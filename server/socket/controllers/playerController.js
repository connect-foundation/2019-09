const { INITIAL_PLAYER_STATUS } = require('../../config');
const roomController = require('./roomController');
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

const getPlayerBySocket = socket => {
  const room = roomController.getRoomByRoomId(socket.roomId);
  return room.players[socket.id];
};

/**
 * 플레이어의 속성을 설정합니다. 첫번째 매개변수로 변경할 플레이어를,
 * 두번째 매개변수로 변경할 속성의 key값과 변경될 value를 넣어줍니다.
 * @param {player} player
 * @param {keyAndValue} param1
 */
const setPlayer = (player, obj) => {
  const keys = Object.keys(obj);
  keys.forEach(key => {
    player[key] = obj[key];
  });
};

module.exports = { createPlayer, getPlayerBySocket, setPlayer };
