import successIcon from '../assets/success.png';
import errorIcon from '../assets/error.png';
import informationIcon from '../assets/information.png';
import warningIcon from '../assets/warning.png';

const SUCCESS = 'success';
const WARNING = 'warning';
const ERROR = 'error';
const INFORMATION = 'info';

const TOAST_TPYES = {
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

export { TOAST_TPYES, TOAST_ICONS, TOAST_POSITION, TOAST_TIME };
