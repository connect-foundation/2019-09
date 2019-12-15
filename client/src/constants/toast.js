import successIcon from '../assets/success.png';
import errorIcon from '../assets/error.png';
import informationIcon from '../assets/information.png';
import warningIcon from '../assets/warning.png';

const SUCCESS = 'success';
const WORNING = 'worning';
const ERROR = 'error';
const INFORMATION = 'info';

const TOAST_TPYES = {
  SUCCESS,
  WORNING,
  ERROR,
  INFORMATION,
};

const TOAST_ICONS = {
  [SUCCESS]: successIcon,
  [WORNING]: warningIcon,
  [ERROR]: errorIcon,
  [INFORMATION]: informationIcon,
};

export { TOAST_TPYES, TOAST_ICONS };
