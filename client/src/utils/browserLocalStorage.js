const getNickname = () => {
  if (!localStorage) return '';
  return localStorage.getItem('nickname') || '';
};

const setNickname = nickname => {
  if (!localStorage) return;
  localStorage.setItem('nickname', nickname);
};

export default { getNickname, setNickname };
