/* eslint-disable no-alert */
import copyUrlToClipoard from './copyUrlToClipboard';
import { COPY_TO_CLIPBOARD_MESSAGE } from '../constants/message';

const shareUrlButtonClickHandler = () => {
  copyUrlToClipoard();
  alert(`${window.location.href} ${COPY_TO_CLIPBOARD_MESSAGE}`);
};

export default shareUrlButtonClickHandler;
