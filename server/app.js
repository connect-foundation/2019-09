const express = require('express');
const path = require('path');
const logger = require('morgan');
const service = require('./service');
const api = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((req, res) => {
  res.redirect('/');
});

app.service = service;

module.exports = app;
