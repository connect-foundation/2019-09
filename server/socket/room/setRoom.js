const rooms = require('../rooms');

const setRoom = (roomId, obj) => {
  const keys = Object.keys(obj);
  keys.forEach(key => {
    rooms[roomId][key] = obj.key;
  });
};

module.exports = setRoom;
