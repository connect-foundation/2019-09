const path = require('path');
require('dotenv').config({
  path: `${path.join(__dirname)}/../../../../../.env`,
});

const { initializeQuizzes } = require('../index');

initializeQuizzes();
