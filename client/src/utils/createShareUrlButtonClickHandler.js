/* eslint-disable no-alert */
import copyUrlToClipoard from './copyUrlToClipboard';
import { COPY_TO_CLIPBOARD_MESSAGE } from '../constants/message';
import { TOAST_TYPES } from '../constants/toast';

const createShareUrlButtonClickHandler = (openToast, closeToast) => {
  return () => {
    copyUrlToClipoard();
    openToast(
      TOAST_TYPES.INFORMATION,
      `${window.location.href} ${COPY_TO_CLIPBOARD_MESSAGE}`,
    );
    setTimeout(closeToast, 1000);
  };
};

export default createShareUrlButtonClickHandler;
