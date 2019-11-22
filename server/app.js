const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require('./socket');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get((req, res) => {
  res.send('index');
});
app.use((req, res) => {
  res.redirect('/');
});

app.io = io;

module.exports = app;
