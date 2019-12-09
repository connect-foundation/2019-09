const Sequelize = require('sequelize');
const connection = require('../connection');

class Quiz extends Sequelize.Model {}

Quiz.init(
  {
    word: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    selected_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    hits: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: connection,
    modelName: 'quiz',
  },
);

module.exports = Quiz;
