const Sequelize = require('sequelize');
const connection = require('./connection');

class Quiz extends Sequelize.Model {}

Quiz.init(
  {
    word: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '커피',
    },
  },
  {
    sequelize: connection,
    modelName: 'quiz',
  },
);

module.exports = Quiz;
