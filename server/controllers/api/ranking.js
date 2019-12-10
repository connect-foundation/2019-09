const DatabaseManager = require('../../databaseFiles/DatabaseManager');
const Ranking = require('../../databaseFiles/databaseModels/Ranking');
const Quiz = require('../../databaseFiles/databaseModels/Quiz');
const { ERROR_500 } = require('../../constants');

const databaseManager = new DatabaseManager({ Quiz, Ranking });
const getHighRankings = async (req, res) => {
  const rankingList = await databaseManager.getHighRankings();
  if (rankingList) {
    res.status(200).send(rankingList);
  } else {
    res.status(500).send(ERROR_500);
  }
};

const getAllRankings = async (req, res) => {
  const rankingList = await databaseManager.getAllRankings();
  if (rankingList) {
    res.status(200).send(rankingList);
  } else {
    res.status(500).send(ERROR_500);
  }
};

module.exports = { getHighRankings, getAllRankings };
