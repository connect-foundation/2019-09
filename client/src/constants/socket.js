const SOCKETIO_SERVER_URL =
  process.env.NODE_ENV === 'development' ? 'localhost:3001' : '';

export { SOCKETIO_SERVER_URL };
