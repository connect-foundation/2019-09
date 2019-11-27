const reducer = (state, action) => {
  switch (action.type) {
    case 'changeRoomId':
      return { ...state, roomId: action.payload.roomId };
    case 'newChatting':
      return {
        ...state,
        chattingList: [...state.chattingList, action.payload.newChat],
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
