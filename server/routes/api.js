const express = require('express');
const { RankingRepository } = require('../databaseFiles/repositories');
const { RANKING, RANKING_COUNT } = require('./paths');
const { ERROR_500_DATABASE } = require('../constants');

const router = express.Router();
const rankingRepository = new RankingRepository();

router.get(RANKING, async (req, res) => {
  const offset = +req.query.offset || 0;
  try {
    const topRankers = await rankingRepository.getTopRankings(offset);
    res.status(200).send(topRankers);
  } catch (error) {
    console.error(error);
    res.status(500).send(ERROR_500_DATABASE);
  }
});

router.get(RANKING_COUNT, async (req, res) => {
  try {
    const rankingCount = await rankingRepository.getRankingCount();
    res.status(200).send({ rankingCount });
  } catch (error) {
    console.error(error);
    res.status(500).send(ERROR_500_DATABASE);
  }
});

module.exports = router;
