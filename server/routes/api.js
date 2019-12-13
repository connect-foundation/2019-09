const express = require('express');
const { RankingRepository } = require('../databaseFiles/repositories');
const { RANKING, RANKING_INFORMATION } = require('./paths');
const { ERROR_500_DATABASE } = require('../constants');
const { getCurrentTime } = require('../utils/getCurrentTime');

const router = express.Router();
const rankingRepository = new RankingRepository();

router.get(RANKING, async (req, res) => {
  console.log('req.query.datetime: ', req.query.datetime);
  const offset = +req.query.offset || 0;
  try {
    const rankings = await rankingRepository.getRankingsBeforeDateTime(
      offset,
      req.query.datetime,
    );
    res.status(200).send(rankings);
  } catch (error) {
    console.error(error);
    res.status(500).send(ERROR_500_DATABASE);
  }
});

router.get(RANKING_INFORMATION, async (req, res) => {
  try {
    const currentTime = getCurrentTime();
    const rankingCount = await rankingRepository.getRankingCount();

    res.status(200).send({ rankingCount, currentTime });
  } catch (error) {
    console.error(error);
    res.status(500).send(ERROR_500_DATABASE);
  }
});

module.exports = router;
