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

module.exports = setPlayer;
