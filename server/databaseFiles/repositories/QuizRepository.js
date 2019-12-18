const Sequelize = require('sequelize');
const { convertSequelizeArrayData } = require('./utils');
const { Quiz } = require('../databaseModels');
const { QUIZ_CANDIDATES_COUNT } = require('../../constants/gameRule');

class QuizRepository {
  constructor(model = Quiz) {
    this.model = model;
  }

  /**
   * quiz에 필요한 값은
   * word(필수), selected_count, hits
   *
   * @param {quiz} quiz
   */
  async insertQuiz(quiz) {
    await this.model.create(quiz);
  }

  async insertQuizzes(quizzes) {
    await this.model.bulkCreate(quizzes);
  }

  async findRandomQuizzes(size = QUIZ_CANDIDATES_COUNT) {
    const randomQuizzes = await this.model.findAll({
      order: Sequelize.literal('rand()'),
      limit: size,
    });
    const convertedData = convertSequelizeArrayData(randomQuizzes);
    return convertedData;
  }
}

module.exports = QuizRepository;
