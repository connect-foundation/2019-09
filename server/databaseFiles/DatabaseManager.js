const Sequelize = require('sequelize');
const { RANKING_COUNT, QUIZ_CANDIDATES_COUNT } = require('../config');

class DatabaseManager {
  constructor({ Quiz, Ranking }) {
    this.Quiz = Quiz;
    this.Ranking = Ranking;
  }

  async insertRanking({ nickname, score }) {
    try {
      await this.Ranking.create({ nickname, score });
    } catch (error) {
      console.error(error);
    }
  }

  convertMysqlData(mysqlData) {
    if (Array.isArray(mysqlData)) {
      return this.convertArrayMysqlData(mysqlData);
    }
    return this.convertSingleMysqlData(mysqlData);
  }

  convertSingleMysqlData(mysqlData) {
    return mysqlData.dataValues;
  }

  convertArrayMysqlData(mysqlDatas) {
    const convertedData = mysqlDatas.map(mysqlData => {
      return this.convertMysqlData(mysqlData);
    });
    return convertedData;
  }

  async getRankings(offset = 0) {
    const convertedOffSet = offset * RANKING_COUNT;
    try {
      const highRankers = await this.Ranking.findAll({
        order: [
          ['score', 'DESC'],
          ['createdAt', 'ASC'],
        ],
        limit: RANKING_COUNT,
        offset: convertedOffSet,
      });
      const convertedData = this.convertMysqlData(highRankers);
      return convertedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getAllRankings() {
    try {
      const ranking = await this.Ranking.findAll();
      const convertedData = this.convertMysqlData(ranking);
      return convertedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async castQuizCandidates() {
    try {
      const quizCandidates = await this.Quiz.findAll({
        order: Sequelize.literal('rand()'),
        limit: QUIZ_CANDIDATES_COUNT,
      });
      const convertedData = this.convertMysqlData(quizCandidates);
      return convertedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = DatabaseManager;
