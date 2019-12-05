const initialState = {
  chattingList: [],
  viewPlayerList: [],
  gameProgress: 'waiting',
  currentRound: 0,
  currentSet: 0,
  currentSeconds: 0,
  quiz: '',
  quizLength: 0,
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
