const SOCKETIO_SERVER_URL =
  process.env.NODE_ENV === 'development' ? 'localhost:3001' : '';

const WAITING_STATUS = 'waiting';

export { SOCKETIO_SERVER_URL, WAITING_STATUS };
