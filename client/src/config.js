const LOCALSTORAGE_NICKNAME_KEY = 'trycatch-nickname';

const MOBILE_PANEL_HEIGHT = '90%';
const MOBILE_VIEW = 'mobile';
const DESKTOP_VIEW = 'desktop';
const MOBILE_VIEW_BREAKPOINT = 600;

const SOCKETIO_SERVER_URL =
  process.env.NODE_ENV === 'development' ? 'localhost:3001' : '';

const WAITING_STATUS = 'waiting';

export {
  MOBILE_VIEW_BREAKPOINT,
  MOBILE_PANEL_HEIGHT,
  LOCALSTORAGE_NICKNAME_KEY,
  SOCKETIO_SERVER_URL,
  WAITING_STATUS,
  MOBILE_VIEW,
  DESKTOP_VIEW,
};
