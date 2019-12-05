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
    case 'setMessageNotice':
      return {
        ...state,
        messageNotice: {
          isVisible: action.payload.isVisible,
          message: action.payload.message,
        },
      };
    case 'setQuizCandidatesNotice':
      return {
        ...state,
        quizCandidatesNotice: {
          isVisible: action.payload.isVisible,
          quizCandidates: action.payload.quizCandidates,
        },
      };
    case 'setScoreNotice':
      return {
        ...state,
        scoreNotice: {
          isVisible: action.payload.isVisible,
          message: action.payload.message,
          scoreList: action.payload.scoreList,
        },
      };
    case 'setQuiz':
      return {
        ...state,
        quiz: action.payload.quiz,
        quizLength: action.payload.quizLength,
      };
    case 'setStream':
      return {
        ...state,
        stream: action.payload.stream,
      };
    case 'setIsVideoVisible':
      return {
        ...state,
        isVideoVisible: action.payload.isVideoVisible,
      };
    default:
      throw new Error();
  }
};

export default reducer;
