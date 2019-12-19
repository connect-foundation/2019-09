const GameManager = require('../service/game/models/GameManager');

const roomId = 1;
const gameManager = new GameManager(roomId);

test('GameManager는 매개변수로 받은 roomId를 저장합니다.', () => {
  expect(gameManager.roomId).toBe(roomId);
});
