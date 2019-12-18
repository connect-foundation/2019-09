import React, { useEffect, useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientManager from '../../../service/ClientManager';
import { GlobalContext, DispatchContext } from '../../../contexts';
import actions from '../../../actions';
import { useToast } from '../../../hooks';
import { ALLOW_CAMERA_MESSAGE } from '../../../constants/message';
import {
  MOBILE_VIEW_BREAKPOINT,
  MOBILE_VIEW,
  DESKTOP_VIEW,
} from '../../../constants/responsiveView';
import { WAITING_STATUS } from '../../../constants/game';
import GamePresentation from './presenter';
import useStyles from './style';
import useShiftingToWhichView from '../../../hooks/useShiftingToWhichView';
import useIsMobile from '../../../hooks/useIsMobile';
import { TOAST_TPYES } from '../../../constants/toast';
import { gameReducer, gameState as gameInitialState } from './store';

let clientManager;

const readyButtonHandler = () => {
  clientManager.toggleReady();
};

const exitButtonHandler = () => {
  clientManager.exitRoom();
};

const getMediaPermissionHandler = () => {
  clientManager.init();
};

const Game = ({ location, match }) => {
  const {
    gameStatus,
    viewPlayerList,
    currentSeconds,
    quiz,
    quizLength,
    clientManagerInitialized,
    toast,
  } = useContext(GlobalContext);
  const globalDispatch = useContext(DispatchContext);
  const { openToast, closeToast } = useToast({
    open: toast.open,
    dispatch: globalDispatch,
    actions,
  });
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);
  const history = useHistory();
  const shiftingToWhichView = useShiftingToWhichView(MOBILE_VIEW_BREAKPOINT);
  const currentIsMobile = useIsMobile(MOBILE_VIEW_BREAKPOINT);
  const classes = useStyles({
    gamePageRootHeight: gameState.gamePageRootHeight,
    isPlayerListVisible: gameState.isPlayerListVisible,
  });
  const isGameStatusWaiting = gameStatus === WAITING_STATUS;
  const { isPrivateRoomCreation } = location;
  const roomIdFromUrl = match.params.roomId;
  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);

  const showPlayersButtonHandler = () => {
    gameDispatch(
      actions.setIsPlayerListVisible(!gameState.isPlayerListVisible),
    );
  };

  const gamePageLifecycleHandler = () => {
    closeToast();
    return () => {
      clientManager.exitRoom();
    };
  };

  const showPlayerListByViewShifting = () => {
    if (shiftingToWhichView === MOBILE_VIEW) {
      gameDispatch(actions.setIsPlayerListVisible(false));
      return;
    }
    if (shiftingToWhichView === DESKTOP_VIEW) {
      gameDispatch(actions.setIsPlayerListVisible(true));
    }
  };

  const dispatchMobileChattingPanelVisibility = () => {
    gameDispatch(actions.setMobileChattingPanelVisibility(currentIsMobile));
  };

  const dispatchGamePageRootHeight = () => {
    gameDispatch(actions.setGamePageRootHeight(window.innerHeight));
  };

  const getMediaPermissionErrorHandler = () => {
    history.push('/');
    openToast(TOAST_TPYES.INFORMATION, ALLOW_CAMERA_MESSAGE);
    globalDispatch(actions.setClientManagerInitialized(false));
  };

  if (!clientManagerInitialized) {
    clientManager = new ClientManager({
      history,
      roomIdFromUrl,
      isPrivateRoomCreation,
    });
    clientManager
      .getMediaPermission()
      .then(getMediaPermissionHandler)
      .catch(getMediaPermissionErrorHandler);
    globalDispatch(actions.setClientManagerInitialized(true));
  }

  useEffect(gamePageLifecycleHandler, []);
  useEffect(dispatchMobileChattingPanelVisibility, [currentIsMobile]);
  useEffect(dispatchGamePageRootHeight, [currentIsMobile]);
  useEffect(showPlayerListByViewShifting, [shiftingToWhichView]);

  const gameProps = {
    quiz,
    quizLength,
    exitButtonHandler,
    clientManager,
    showPlayersButtonHandler,
    localPlayer,
    currentSeconds,
    classes,
    readyButtonHandler,
    mobileChattingPanelVisibility: gameState.mobileChattingPanelVisibility,
    toast,
    closeToast,
    isGameStatusWaiting,
  };

  return <GamePresentation gameProps={gameProps} />;
};

Game.propTypes = {
  location: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};

export default Game;
