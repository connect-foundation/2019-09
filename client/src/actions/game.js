import TYPES from '../constants/actionTypes';

const setMobileChattingPanelVisibility = mobileChattingPanelVisibility => {
  return {
    type: TYPES.SET_MOBILE_CHATTING_PANEL_VISIBILITY,
    payload: {
      mobileChattingPanelVisibility,
    },
  };
};

const setIsPlayerListVisible = isPlayerListVisible => {
  return {
    type: TYPES.SET_IS_PLAYER_LIST_VISIBLE,
    payload: {
      isPlayerListVisible,
    },
  };
};

const setGamePageRootHeight = gamePageRootHeight => {
  return {
    type: TYPES.SET_GAME_PAGE_ROOT_HEIGHT,
    payload: {
      gamePageRootHeight,
    },
  };
};

export default {
  setMobileChattingPanelVisibility,
  setIsPlayerListVisible,
  setGamePageRootHeight,
};
