import TYPES from '../constants/actionTypes';

const setViewPlayerList = viewPlayerList => {
  return {
    type: TYPES.SET_VIEW_PLAYER_LIST,
    payload: {
      viewPlayerList,
    },
  };
};

const reset = () => {
  return {
    type: TYPES.RESET,
  };
};

const setGameStatus = gameStatus => {
  return {
    type: TYPES.SET_GAME_STATUS,
    payload: {
      gameStatus,
    },
  };
};

const setCurrentSeconds = currentSeconds => {
  return {
    type: TYPES.SET_CURRENT_SECONDS,
    payload: {
      currentSeconds,
    },
  };
};

const setQuiz = (quiz, quizLength) => {
  return {
    type: TYPES.SET_QUIZ,
    payload: {
      quiz,
      quizLength,
    },
  };
};

const setChattingDisabled = chattingDisabled => {
  return {
    type: TYPES.SET_CHATTING_DISABLED,
    payload: {
      chattingDisabled,
    },
  };
};

const setScoreNotice = ({ isVisible, message, scoreList }) => {
  return {
    type: TYPES.SET_SCORE_NOTICE,
    payload: {
      isVisible,
      message,
      scoreList,
    },
  };
};

const setVideoVisibility = videoVisibility => {
  return {
    type: TYPES.SET_VIDEO_VISIBLE,
    payload: {
      videoVisibility,
    },
  };
};

const setCurrentRound = currentRound => {
  return {
    type: TYPES.SET_CURRENT_ROUND,
    payload: {
      currentRound,
    },
  };
};

const setCurrentSet = currentSet => {
  return {
    type: TYPES.SET_CURRENT_SET,
    payload: {
      currentSet,
    },
  };
};

const setMessageNotice = (isVisible, message) => {
  return {
    type: TYPES.SET_MESSAGE_NOTICE,
    payload: {
      isVisible,
      message,
    },
  };
};
const setQuizCandidatesNotice = (isVisible, quizCandidates) => {
  return {
    type: TYPES.SET_QUIZ_CANDIDATES_NOTICE,
    payload: {
      isVisible,
      quizCandidates,
    },
  };
};
const setStream = stream => {
  return {
    type: TYPES.SET_STREAM,
    payload: {
      stream,
    },
  };
};
const clearWindow = () => {
  return {
    type: TYPES.CLEAR_WINDOW,
  };
};

const setClientManagerInitialized = clientManagerInitialized => {
  return {
    type: TYPES.SET_CLIENT_MANAGER_INITIALIZED,
    payload: {
      clientManagerInitialized,
    },
  };
};

const closeToast = toastType => {
  return {
    type: TYPES.SET_TOAST,
    payload: {
      toast: {
        open: false,
        toastType,
        message: '',
      },
    },
  };
};

const openToast = (toastType, message) => {
  return {
    type: TYPES.SET_TOAST,
    payload: {
      toast: {
        open: true,
        toastType,
        message,
      },
    },
  };
};

export default {
  setViewPlayerList,
  reset,
  setGameStatus,
  setCurrentSeconds,
  setQuiz,
  setChattingDisabled,
  setScoreNotice,
  setVideoVisibility,
  setCurrentRound,
  setCurrentSet,
  setMessageNotice,
  setQuizCandidatesNotice,
  setStream,
  clearWindow,
  setClientManagerInitialized,
  openToast,
  closeToast,
};
