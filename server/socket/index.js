const { matchHandler } = require('./handlers');
const io = require('./io');

io.on('connection', socket => {
  socket.on('askSocketId', () => {
    socket.emit('sendSocketId', { socketId: socket.id });
  });
  socket.on('match', matchHandler.bind(null, socket));
});

module.exports = io;
