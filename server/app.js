const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require('socket.io')();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  io.sockets.emit(
    'user-joined',
    socket.id,
    io.engine.clientsCount,
    Object.keys(io.sockets.clients().sockets),
  );

  socket.on('sdp', (toId, message) => {
    io.to(toId).emit('sdp', socket.id, message);
  });

  socket.on('ice', (toId, message) => {
    io.to(toId).emit('ice', socket.id, message);
  });

  socket.on('disconnect', () => {
    io.sockets.emit('user-left', socket.id);
  });
});
app.io = io;

module.exports = app;
