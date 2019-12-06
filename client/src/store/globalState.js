const initialState = {
  chattingList: [],
  viewPlayerList: [],
  gameStatus: 'waiting',
  currentRound: 0,
  currentSet: 0,
  currentSeconds: 0,
  quiz: '',
  quizLength: 0,
  stream: null,
  isVideoVisible: false,
  isChattingDisabled: false,
  messageNotice: {
    isVisible: false,
    message: '',
  },
  quizCandidatesNotice: {
    isVisible: false,
    quizCandidates: [],
  },
  scoreNotice: {
    isVisible: false,
    message: '',
    scoreList: [],
  },
};

export default initialState;
