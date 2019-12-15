const MainIntroductionTitle = 'Introduction';
const MainIntroductionDescription = `Try Catch는 "몸으로 말해요"의 웹 버전입니다.
몸동작으로 문제를 Try!
화면을 보고 정답을 Catch!
Try Catch에서 당신의 창의력을 마음껏 뽐내보세요!
`;
const MainSlogan = `"Talk is cheap. Show me the move."`;

const MOBILE_VIEW_BREAKPOINT = 600;

const DEFAULT_SCOREBOARD_TITLE = 'Final Score';

const DEFAULT_TEXT_INPUT_MAX_LENGTH = 100;

const NICKNAME_LENGTH = 8;

const MAX_CHAT_LENGTH = 40;

const WAITING_FOR_STREAMER = 'Waiting For Streamer...';

const MOBILE_PANEL_HEIGHT = '50%';

const LOCALSTORAGE_NICKNAME_KEY = 'trycatch-nickname';

const SOCKETIO_SERVER_URL =
  process.env.NODE_ENV === 'development' ? 'localhost:3001' : '';
const GAME_END_SCOREBOARD_TITLE = '게임 종료';

export {
  MainIntroductionDescription,
  MainIntroductionTitle,
  MainSlogan,
  MOBILE_VIEW_BREAKPOINT,
  DEFAULT_SCOREBOARD_TITLE,
  DEFAULT_TEXT_INPUT_MAX_LENGTH,
  NICKNAME_LENGTH,
  MAX_CHAT_LENGTH,
  WAITING_FOR_STREAMER,
  MOBILE_PANEL_HEIGHT,
  LOCALSTORAGE_NICKNAME_KEY,
  SOCKETIO_SERVER_URL,
  GAME_END_SCOREBOARD_TITLE,
};
