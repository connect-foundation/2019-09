const fs = require('fs');
const csv = require('csv-parser');
const { Quiz } = require('../');

const initializeQuizzes = async () => {
  const quizzes = [];
  fs.createReadStream('./databaseModels/seeder/quizzes.csv')
    .pipe(csv())
    .on('data', data => {
      quizzes.push(data);
    })
    .on('end', async () => {
      try {
        quizzes.forEach(async quiz => {
          await Quiz.create(quiz);
        });
      } catch (error) {
        console.error(error);
      }
    });
};

module.exports = { initializeQuizzes };
