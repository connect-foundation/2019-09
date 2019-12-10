const express = require('express');
const {
  getHighRankings,
  getAllRankings,
} = require('../../controllers/api/ranking');

const router = express.Router();
router.get('/ranking', getAllRankings);
router.get('/ranking/top-100', getHighRankings);
module.exports = router;
