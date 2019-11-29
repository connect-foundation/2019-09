const reducer = (state, action) => {
  switch (action.type) {
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
    case 'setViewPlayerList':
      return {
        ...state,
        viewPlayerList: [...action.payload.viewPlayerList],
      };
    default:
      throw new Error();
  }
};

export default reducer;
