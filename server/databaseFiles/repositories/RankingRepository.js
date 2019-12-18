const Sequelize = require('sequelize');
const { convertSequelizeArrayData } = require('./utils');
const { Ranking } = require('../databaseModels');
const { RANKING_COUNTS, INVALID_DATE } = require('../../constants/database');

class RankingRepository {
  constructor(model = Ranking) {
    this.model = model;
  }

  checkInvalidDate(dateTime) {
    return new Date(dateTime).toString() === INVALID_DATE
      ? new Date()
      : new Date(dateTime);
  }

  /**
   * ranking에 필요한 값은
   * nickname(필수), score, season
   *
   * @param {ranking} ranking
   */
  async insertRanking(ranking) {
    await this.model.create(ranking);
  }

  async insertRankings(rankings) {
    await this.model.bulkCreate(rankings);
  }

  async getRankingsBeforeDateTime(offset = 0, dateTime) {
    offset *= RANKING_COUNTS;
    const convertedDateTime = this.checkInvalidDate(dateTime);
    const topRankers = await this.model.findAll({
      order: [
        ['score', 'DESC'],
        ['createdAt', 'ASC'],
      ],
      limit: RANKING_COUNTS,
      offset,
      where: {
        createdAt: {
          [Sequelize.Op.lte]: convertedDateTime,
        },
      },
    });

    const convertedData = convertSequelizeArrayData(topRankers);
    return convertedData;
  }

  async getAllRankings() {
    const rankings = await this.model.findAll();
    const convertedData = convertSequelizeArrayData(rankings);
    return convertedData;
  }

  async getRankingCount() {
    const rankingCount = await this.model.count();
    return rankingCount;
  }
}

module.exports = RankingRepository;
