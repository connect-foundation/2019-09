import React, { useEffect, useState, useContext } from 'react';
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
import { WAITING_STATUS } from '../../../config';
import GamePresentation from './presenter';
import useStyles from './style';
import useShiftingToWhichView from '../../../hooks/useShiftingToWhichView';
import useIsMobile from '../../../hooks/useIsMobile';

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
  const dispatch = useContext(DispatchContext);
  const { closeToast } = useToast({ open: toast.open, dispatch, actions });

  const history = useHistory();
  const shiftingToWhichView = useShiftingToWhichView(MOBILE_VIEW_BREAKPOINT);
  const currentIsMobile = useIsMobile(MOBILE_VIEW_BREAKPOINT);
  const initialIsMobile = window.innerWidth < MOBILE_VIEW_BREAKPOINT;
  const [
    mobileChattingPanelVisibility,
    setMobileChattingPanelVisibility,
  ] = useState(initialIsMobile);
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(
    !initialIsMobile,
  );
  const [gamePageRootHeight, setGamePageRootHeight] = useState(
    window.innerHeight,
  );
  const classes = useStyles(gamePageRootHeight);

  const { isPrivateRoomCreation } = location;
  const roomIdFromUrl = match.params.roomId;

  if (!clientManagerInitialized) {
    clientManager = new ClientManager({
      history,
      roomIdFromUrl,
      isPrivateRoomCreation,
    });
    clientManager
      .getMediaPermission()
      .then(() => {
        clientManager.init();
        clientManager.setClientManagerInitialized(true);
      })
      .catch(() => {
        history.push('/');
        clientManager.setClientManagerInitialized(false);
        alert(ALLOW_CAMERA_MESSAGE);
      });
    clientManager.setClientManagerInitialized(true);
  }

  const exitButtonHandler = () => {
    clientManager.exitRoom();
  };

  const showPlayersButtonHandler = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  const readyButtonHandler = () => {
    clientManager.toggleReady();
  };

  useEffect(() => {
    window.onpopstate = () => {
      exitButtonHandler();
    };
  }, []);

  useEffect(() => {
    setMobileChattingPanelVisibility(currentIsMobile);
    setGamePageRootHeight(window.innerHeight);
  }, [currentIsMobile]);

  useEffect(() => {
    if (shiftingToWhichView === MOBILE_VIEW) {
      setIsPlayerListVisible(false);
      return;
    }
    if (shiftingToWhichView === DESKTOP_VIEW) {
      setIsPlayerListVisible(true);
    }
  }, [shiftingToWhichView]);

  const bottomLeftButtonContainerClasses =
    gameStatus === WAITING_STATUS
      ? [classes.mobileBottomLeftButtonContainer, classes.desktopViewHide]
      : classes.gameStartHide;

  const playerPanelContainerClasses = isPlayerListVisible
    ? classes.playerPanelContainer
    : [classes.playerPanelContainer, classes.mobileViewHide];

  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);

  const gameProps = {
    quiz,
    quizLength,
    exitButtonHandler,
    clientManager,
    showPlayersButtonHandler,
    playerPanelContainerClasses,
    bottomLeftButtonContainerClasses,
    localPlayer,
    currentSeconds,
    classes,
    readyButtonHandler,
    mobileChattingPanelVisibility,
    toast,
    closeToast,
  };

  return <GamePresentation gameProps={gameProps} />;
};

Game.propTypes = {
  location: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};

export default Game;
