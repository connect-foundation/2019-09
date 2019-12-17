const WELCOME_MESSAGE = (isRoomPrivate, minutes, seconds) => ({
  nickname: '안내',
  message: `채팅방에 입장하였습니다. ${
    isRoomPrivate ? `${minutes}분` : `${seconds}초`
  } 안에 READY버튼을 눌러주세요.🙌`,
});

const DEFAULT_NICKNAME = 'Guest';

const CHATTING_INPUT_PLACEHOLER = 'Please enter a message.';

export { WELCOME_MESSAGE, DEFAULT_NICKNAME, CHATTING_INPUT_PLACEHOLER };
