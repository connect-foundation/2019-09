import { LOCALSTORAGE_NICKNAME_KEY } from '../config';
import { NICKNAME_LENGTH } from '../constants/inputConstraints';

const getNickname = () => {
  if (!localStorage) return '';
  return localStorage.getItem(LOCALSTORAGE_NICKNAME_KEY) || '';
};

const setNickname = nickname => {
  if (!localStorage) return;
  localStorage.setItem(LOCALSTORAGE_NICKNAME_KEY, nickname);
};

const verifyNicknameInLocalStorage = () => {
  const nickname = getNickname();
  if (!nickname) return;

  const trimedNickname = nickname.trim();
  if (!trimedNickname) {
    localStorage.removeItem(LOCALSTORAGE_NICKNAME_KEY);
  } else if (trimedNickname.length > NICKNAME_LENGTH) {
    const slicedNickname = trimedNickname.slice(0, NICKNAME_LENGTH);
    localStorage.setItem(LOCALSTORAGE_NICKNAME_KEY, slicedNickname);
  }
};

export default { getNickname, setNickname, verifyNicknameInLocalStorage };
