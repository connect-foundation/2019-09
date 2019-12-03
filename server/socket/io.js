const io = require('socket.io')();

const { rooms } = io.sockets.adapter;

module.exports = { io, rooms };
