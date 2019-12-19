const GameManager = require('../service/game/models/GameManager');
const Player = require('../service/game/models/Player');

const roomId = 1;
const gameManager = new GameManager(roomId);

test('GameManager는 매개변수로 받은 roomId를 저장합니다.', () => {
  expect(gameManager.roomId).toBe(roomId);
});

const player = new Player({
  socketId: 1,
  nickname: 'player1',
  nicknameColor: 'color',
});

const players = [];

const insertPlayers = list => {
  for (let i = 2; i < 5; i++) {
    list.push(
      new Player({
        socketId: i,
        nickname: `player${i}`,
        nicknameColor: 'color',
      }),
    );
  }
};

insertPlayers(players);

test('GameManager에 플레이어를 넣습니다.', () => {
  gameManager.addPlayer(player);
  expect(gameManager.players[0]).toBe(player);
  expect(gameManager.players[0]).toEqual(player);
});

test('GameManager에 여러 플레이어를 넣습니다.', () => {
  players.forEach(eachPlayer => gameManager.addPlayer(eachPlayer));
  players.forEach((eachPlayer, i) => {
    expect(gameManager.players[i + 1]).toStrictEqual(eachPlayer);
  });
});
