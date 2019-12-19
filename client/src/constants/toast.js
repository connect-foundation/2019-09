import successIcon from '../assets/success.png';
import errorIcon from '../assets/error.png';
import informationIcon from '../assets/information.png';
import warningIcon from '../assets/warning.png';

const SUCCESS = 'success';
const WARNING = 'warning';
const ERROR = 'error';
const INFORMATION = 'info';

const TOAST_TYPES = {
  SUCCESS,
  WARNING,
  ERROR,
  INFORMATION,
};

const TOAST_ICONS = {
  [SUCCESS]: successIcon,
  [WARNING]: warningIcon,
  [ERROR]: errorIcon,
  [INFORMATION]: informationIcon,
};

const TOAST_POSITION = {
  vertical: 'top',
  horizontal: 'center',
};

const TOAST_TIME = 3000;

const TOAST_MESSAGE = {
  INACTIVE_PLAYER_BAN: '장기간 READY를 하지 않아 메인페이지로 이동합니다.',
  INACTIVE_PLAYER_WARNING: banTime =>
    `${banTime}초 뒤 메인페이지로 이동합니다. READY 버튼을 눌러주세요!`,
};

export { TOAST_TYPES, TOAST_ICONS, TOAST_POSITION, TOAST_TIME, TOAST_MESSAGE };
