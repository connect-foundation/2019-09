const { MAX_RANKING_COUNT } = require('../config');

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
      return this.converArrayMysqlData(mysqlData);
    }
    return this.convertSingleMysqlData(mysqlData);
  }

  convertSingleMysqlData(mysqlData) {
    return mysqlData.dataValues;
  }

  converArrayMysqlData(mysqlDatas) {
    const convertedData = mysqlDatas.map(mysqlData => {
      return this.convertMysqlData(mysqlData);
    });
    return convertedData;
  }

  async getHighRankings() {
    try {
      const highRankers = await this.Ranking.findAll({
        order: [
          ['score', 'DESC'],
          ['createdAt', 'ASC'],
        ],
        limit: MAX_RANKING_COUNT,
      });
      const convertedData = this.convertMysqlData(highRankers);
      return convertedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = DatabaseManager;
