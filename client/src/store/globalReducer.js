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
    case 'setGameProgress':
      return {
        ...state,
        gameProgress: action.payload.gameProgress,
      };
    case 'setCurrentRound':
      return {
        ...state,
        currentRound: action.payload.currentRound,
      };
    case 'setCurrentSet':
      return {
        ...state,
        currentSet: action.payload.currentSet,
      };
    case 'setQuizCandidates':
      return {
        ...state,
        quizCandidates: action.payload.quizCandidates,
      };
    case 'setCurrentSeconds':
      return {
        ...state,
        currentSeconds: action.payload.currentSeconds,
      };
    default:
      throw new Error();
  }
};

export default reducer;
