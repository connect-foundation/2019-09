const express = require('express');
const { getRankings } = require('../../controllers/api/ranking');

const router = express.Router();
router.get('/ranking', getRankings);
module.exports = router;
