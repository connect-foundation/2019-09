const MainIntroductionTitle = 'How to Play';
const MainIntroductionDescription = `자신의 차례가 되면, 세 가지 단어 중에서 한 가지를 선택하고 80 초 안에 그 단어를 몸으로 표현해야 합니다. 또는 다른 누군가가 몸으로 표현할 때 포인트를 얻으려면 채팅으로 정답을 추측해서 입력해야 합니다. 랭킹에 오르기 위해서는 최대한 많은 정답을 맞히세요!`;
const MainSlogan = `"Talk is cheap. Show me the move."`;

const DEFAULT_SCOREBOARD_TITLE = 'Final Score';
const WAITING_FOR_STREAMER = 'Waiting For Streamer...';
const GAME_END_SCOREBOARD_TITLE = '게임 종료';
const ALLOW_CAMERA_MESSAGE = '카메라를 허용해주세요';

const LOCALSTORAGE_NICKNAME_KEY = 'trycatch-nickname';

const MOBILE_PANEL_HEIGHT = '90%';
const MOBILE_VIEW = 'mobile';
const DESKTOP_VIEW = 'desktop';
const MOBILE_VIEW_BREAKPOINT = 600;

const SOCKETIO_SERVER_URL =
  process.env.NODE_ENV === 'development' ? 'localhost:3001' : '';

const WAITING_STATUS = 'waiting';

export {
  MainIntroductionDescription,
  MainIntroductionTitle,
  MainSlogan,
  MOBILE_VIEW_BREAKPOINT,
  DEFAULT_SCOREBOARD_TITLE,
  WAITING_FOR_STREAMER,
  MOBILE_PANEL_HEIGHT,
  LOCALSTORAGE_NICKNAME_KEY,
  SOCKETIO_SERVER_URL,
  GAME_END_SCOREBOARD_TITLE,
  WAITING_STATUS,
  MOBILE_VIEW,
  DESKTOP_VIEW,
  ALLOW_CAMERA_MESSAGE,
};
