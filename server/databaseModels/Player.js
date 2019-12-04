const Sequelize = require('sequelize');
const connection = require('./connection');

class Player extends Sequelize.Model {}

Player.init(
  {
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    points: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: 'player',
  },
);

module.exports = Player;
