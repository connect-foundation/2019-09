import { NICKNAME_LENGTH } from '../config';

const getNickname = () => {
  if (!localStorage) return '';
  return localStorage.getItem('nickname') || '';
};

const setNickname = nickname => {
  if (!localStorage) return;
  localStorage.setItem('nickname', nickname);
};

const verifyNicknameInLocalStorage = () => {
  const nickname = getNickname();
  if (!nickname) return;

  const trimedNickname = nickname.trim();
  if (!trimedNickname) {
    localStorage.removeItem('nickname');
  } else if (trimedNickname.length > NICKNAME_LENGTH) {
    const slicedNickname = trimedNickname.slice(0, NICKNAME_LENGTH);
    localStorage.setItem('nickname', slicedNickname);
  }
};

export default { getNickname, setNickname, verifyNicknameInLocalStorage };
