import TYPES from '../constants/actions';

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

const setIsChattingDisabled = isChattingDisabled => {
  return {
    type: TYPES.SET_IS_CHATTING_DISABLED,
    payload: {
      isChattingDisabled,
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

const setIsVideoVisible = isVideoVisible => {
  return {
    type: TYPES.SET_IS_VIDEO_VISIBLE,
    payload: {
      isVideoVisible,
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

export default {
  setViewPlayerList,
  reset,
  setGameStatus,
  setCurrentSeconds,
  setQuiz,
  setIsChattingDisabled,
  setScoreNotice,
  setIsVideoVisible,
  setCurrentRound,
  setCurrentSet,
  setMessageNotice,
  setQuizCandidatesNotice,
  setStream,
};
