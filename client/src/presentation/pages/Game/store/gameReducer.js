import TYPES from '../../../../constants/actionTypes';

const gameReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_MOBILE_CHATTING_PANEL_VISIBILITY:
      return {
        ...state,
        mobileChattingPanelVisibility:
          action.payload.mobileChattingPanelVisibility,
      };
    case TYPES.SET_IS_PLAYER_LIST_VISIBLE:
      return {
        ...state,
        isPlayerListVisible: action.payload.isPlayerListVisible,
      };
    case TYPES.SET_GAME_PAGE_ROOT_HEIGHT:
      return {
        ...state,
        gamePageRootHeight: action.payload.gamePageRootHeight,
      };
    default:
      throw new Error();
  }
};

export default gameReducer;
