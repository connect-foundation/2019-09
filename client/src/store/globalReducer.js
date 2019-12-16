import initialState from './globalState';
import TYPES from '../constants/actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_CHATTING:
      return {
        ...state,
        chattingList: [...state.chattingList, action.payload.newChatting],
      };
    case TYPES.SET_VIEW_PLAYER_LIST:
      return {
        ...state,
        viewPlayerList: [...action.payload.viewPlayerList],
      };
    case TYPES.SET_GAME_STATUS:
      return {
        ...state,
        gameStatus: action.payload.gameStatus,
      };
    case TYPES.SET_CURRENT_ROUND:
      return {
        ...state,
        currentRound: action.payload.currentRound,
      };
    case TYPES.SET_CURRENT_SET:
      return {
        ...state,
        currentSet: action.payload.currentSet,
      };
    case TYPES.SET_CURRENT_SECONDS:
      return {
        ...state,
        currentSeconds: action.payload.currentSeconds,
      };
    case TYPES.SET_MESSAGE_NOTICE:
      return {
        ...state,
        messageNotice: {
          isVisible: action.payload.isVisible,
          message: action.payload.message,
        },
      };
    case TYPES.SET_QUIZ_CANDIDATES_NOTICE:
      return {
        ...state,
        quizCandidatesNotice: {
          isVisible: action.payload.isVisible,
          quizCandidates: action.payload.quizCandidates,
        },
      };
    case TYPES.SET_SCORE_NOTICE:
      return {
        ...state,
        scoreNotice: {
          isVisible: action.payload.isVisible,
          message: action.payload.message,
          scoreList: action.payload.scoreList,
        },
      };
    case TYPES.SET_QUIZ:
      return {
        ...state,
        quiz: action.payload.quiz,
        quizLength: action.payload.quizLength,
      };
    case TYPES.SET_STREAM:
      return {
        ...state,
        stream: action.payload.stream,
      };
    case TYPES.SET_VIDEO_VISIBLE:
      return {
        ...state,
        videoVisibility: action.payload.videoVisibility,
      };
    case TYPES.SET_CHATTING_DISABLED:
      return {
        ...state,
        chattingDisabled: action.payload.chattingDisabled,
      };
    case TYPES.RESET:
      return {
        ...initialState,
      };
    case TYPES.CLEAR_WINDOW:
      return {
        ...state,
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
    case TYPES.SET_CLIENT_MANAGER_INITIALIZED:
      return {
        ...state,
        clientManagerInitialized: action.payload.clientManagerInitialized,
      };
    case TYPES.SET_TOAST:
      return {
        ...state,
        toast: {
          open: action.payload.toast.open,
          message: action.payload.toast.message,
          toastType: action.payload.toast.toastType
            ? action.payload.toast.toastType
            : state.toast.toastType,
        },
      };
    default:
      throw new Error();
  }
};

export default reducer;
