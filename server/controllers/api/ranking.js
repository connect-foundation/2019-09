const DatabaseManager = require('../../databaseFiles/DatabaseManager');
const Ranking = require('../../databaseFiles/databaseModels/Ranking');
const Quiz = require('../../databaseFiles/databaseModels/Quiz');
const { ERROR_500_DATABASE } = require('../../constants');

const databaseManager = new DatabaseManager({ Quiz, Ranking });
const getRankings = async (req, res) => {
  const offset = +req.query.offset || 0;
  const rankingList = await databaseManager.getRankings(offset);
  if (rankingList) {
    res.status(200).send(rankingList);
  } else {
    res.status(500).send(ERROR_500_DATABASE);
  }
};

const getAllRankings = async (req, res) => {
  const rankingList = await databaseManager.getAllRankings();
  if (rankingList) {
    res.status(200).send(rankingList);
  } else {
    res.status(500).send(ERROR_500_DATABASE);
  }
};

module.exports = { getRankings, getAllRankings };
