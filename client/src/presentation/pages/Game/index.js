import React, { useEffect, useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientManager from '../../../service/ClientManager';
import { GlobalContext, DispatchContext } from '../../../contexts';
import actions from '../../../actions';
import { useToast } from '../../../hooks';
import {
  MOBILE_VIEW_BREAKPOINT,
  WAITING_STATUS,
  MOBILE_VIEW,
  DESKTOP_VIEW,
  ALLOW_CAMERA_MESSAGE,
} from '../../../config';
import GamePresentation from './presenter';
import useStyles from './style';
import useShiftingToWhichView from '../../../hooks/useShiftingToWhichView';
import useIsMobile from '../../../hooks/useIsMobile';
import { TOAST_TPYES } from '../../../constants/toast';
import EVENTS from '../../../constants/events';
import { gameReducer, gameState as gameInitialState } from './store';

let clientManager;

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

  const { isPrivateRoomCreation } = location;
  const roomIdFromUrl = match.params.roomId;

  const getMediaPermissionHandler = () => {
    clientManager.init();
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

  const exitButtonHandler = () => {
    clientManager.exitRoom();
  };

  const showPlayersButtonHandler = () => {
    gameDispatch(
      actions.setIsPlayerListVisible(!gameState.isPlayerListVisible),
    );
  };

  const readyButtonHandler = () => {
    clientManager.toggleReady();
  };

  useEffect(() => {
    window.addEventListener(EVENTS.POPSTATE, exitButtonHandler);
    return () => {
      window.removeEventListener(EVENTS.POPSTATE, exitButtonHandler);
    };
  }, []);

  useEffect(() => {
    gameDispatch(actions.setMobileChattingPanelVisibility(currentIsMobile));
    gameDispatch(actions.setGamePageRootHeight(window.innerHeight));
  }, [currentIsMobile]);

  useEffect(() => {
    if (shiftingToWhichView === MOBILE_VIEW) {
      gameDispatch(actions.setIsPlayerListVisible(false));
      return;
    }
    if (shiftingToWhichView === DESKTOP_VIEW) {
      gameDispatch(actions.setIsPlayerListVisible(true));
    }
  }, [shiftingToWhichView]);

  const isGameStatusWaiting = gameStatus === WAITING_STATUS;

  const classes = useStyles({
    gamePageRootHeight: gameState.gamePageRootHeight,
    isPlayerListVisible: gameState.isPlayerListVisible,
  });

  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);

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
