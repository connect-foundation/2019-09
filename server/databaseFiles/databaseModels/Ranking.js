const Sequelize = require('sequelize');
const connection = require('../connection');

class Ranking extends Sequelize.Model {}

Ranking.init(
  {
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    season: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: 'ranking',
  },
);

module.exports = Ranking;
