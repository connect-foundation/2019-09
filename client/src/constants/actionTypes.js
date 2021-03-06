const globalTypes = {
  RESET: 'reset',
  ADD_CHATTING: 'addChatting',
  SET_QUIZ: 'setQuiz',
  SET_TOAST: 'setToast',
  SET_STREAM: 'setStream',
  SET_GAME_STATUS: 'setGameStatus',
  SET_CURRENT_SET: 'setCurrentSet',
  SET_SCORE_NOTICE: 'setScoreNotice',
  SET_CURRENT_ROUND: 'setCurrentRound',
  SET_MESSAGE_NOTICE: 'setMessageNotice',
  SET_CURRENT_SECONDS: 'setCurrentSeconds',
  SET_VIEW_PLAYER_LIST: 'setViewPlayerList',
  SET_VIDEO_VISIBILITY: 'setVideoVisibility',
  SET_CHATTING_DISABLED: 'setChattingDisabled',
  SET_QUIZ_CANDIDATES_NOTICE: 'setQuizCandidatesNotice',
  CLEAR_WINDOW: 'clearWindow',
  SET_CLIENT_MANAGER_INITIALIZED: 'setClientManagerInitialized',
  SET_IS_ROOM_ID_RECEIVED: 'setIsRoomIdReceived',
};

const gameTypes = {
  SET_MOBILE_CHATTING_PANEL_VISIBILITY: 'setMobileChattingPanelVisibility',
  SET_IS_PLAYER_LIST_VISIBLE: 'setIsPlayerListVisible',
  SET_GAME_PAGE_ROOT_HEIGHT: 'setGamePageRootHeight',
};

export default { ...globalTypes, ...gameTypes };
