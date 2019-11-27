const reducer = (state, action) => {
  switch (action.type) {
    case 'changeRoomId':
      return { ...state, roomId: action.payload.roomId };
    default:
      throw new Error();
  }
};

export default reducer;
