const reducer = (state, action) => {
  switch (action.type) {
    case 'changeNickname':
      return { ...state, nickname: action.payload.nickname };
    case 'addChatting':
      return {
        ...state,
        chattingList: [...state.chattingList, action.payload.newChatting],
      };
    case 'resetChattingList':
      return {
        ...state,
        chattingList: [],
      };
    default:
      throw new Error();
  }
};

export default reducer;
