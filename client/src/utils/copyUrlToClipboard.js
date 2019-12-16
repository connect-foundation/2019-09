import { INPUT_TAG, BROWSER_COPY_COMMAND } from '../constants/browser';

const copyUrlToClipboard = () => {
  const temporaryInput = document.createElement(INPUT_TAG);
  const urlToCopy = window.location.href;
  document.body.appendChild(temporaryInput);
  temporaryInput.value = urlToCopy;
  temporaryInput.select();
  document.execCommand(BROWSER_COPY_COMMAND);
  document.body.removeChild(temporaryInput);
};

export default copyUrlToClipboard;
