const fs = require('fs');
const csv = require('csv-parser');
const { Quiz, Ranking } = require('../');

const initializeQuizzes = async () => {
  const quizzes = [];
  fs.createReadStream('./databaseFiles/databaseModels/seeder/quizzes.csv')
    .pipe(csv())
    .on('data', data => {
      quizzes.push(data);
    })
    .on('end', async () => {
      try {
        await Quiz.bulkCreate(quizzes);
      } catch (error) {
        console.error(error);
      }
    });
};

const initializeRankings = async () => {
  const rankings = [];
  fs.createReadStream('./databaseFiles/databaseModels/seeder/ranking.csv')
    .pipe(csv())
    .on('data', data => {
      rankings.push(data);
    })
    .on('end', async () => {
      try {
        await Ranking.bulkCreate(rankings);
      } catch (error) {
        console.error(error);
      }
    });
};

module.exports = { initializeQuizzes, initializeRankings };
