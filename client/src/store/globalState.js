const initialState = {
  // chatting
  chattingList: [],
  chattingDisabled: false,

  // player panel
  viewPlayerList: [],

  // game information
  gameStatus: 'waiting',
  currentRound: 0,
  currentSet: 0,
  currentSeconds: '', // string
  quiz: '',
  quizLength: 0,

  // video
  stream: null,
  videoVisibility: false,

  // streaming panel
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

  clientManagerInitialized: false,

  toast: {
    open: false,
    message: '',
    toastType: '',
  },

  isRoomIdReceived: false,
};

export default initialState;
