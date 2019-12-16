const WELCOME_MESSAGE = (isRoomPrivate, minutes, seconds) => ({
  nickname: '안내',
  message: `채팅방에 입장하였습니다. ${
    isRoomPrivate ? `${minutes}분` : `${seconds}초`
  } 안에 READY버튼을 눌러주세요.🙌`,
});

export default WELCOME_MESSAGE;
