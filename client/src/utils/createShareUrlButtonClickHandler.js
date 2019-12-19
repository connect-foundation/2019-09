/* eslint-disable no-alert */
import copyUrlToClipoard from './copyUrlToClipboard';
import { COPY_TO_CLIPBOARD_MESSAGE } from '../constants/message';
import { TOAST_TYPES } from '../constants/toast';
import { CLIPBOARD_COPY_MESSAGE_DURATION } from '../constants/timer';
import Timer from '../service/Timer';

const createShareUrlButtonClickHandler = (openToast, closeToast) => {
  return () => {
    copyUrlToClipoard();
    openToast(
      TOAST_TYPES.INFORMATION,
      `${window.location.href} ${COPY_TO_CLIPBOARD_MESSAGE}`,
    );
    new Timer().startTimeoutTimer(CLIPBOARD_COPY_MESSAGE_DURATION, closeToast);
  };
};

export default createShareUrlButtonClickHandler;
