import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientManager from '../../../service/ClientManager';
import { MOBILE_VIEW_BREAKPOINT } from '../../../config';
import { GlobalContext } from '../../../contexts';
import GamePresentation from './presenter';
import useStyles from './style';

let clientManager;

const Game = ({ location, match }) => {
  const {
    gameStatus,
    viewPlayerList,
    currentSeconds,
    quiz,
    quizLength,
    clientManagerInitialized,
  } = useContext(GlobalContext);

  const { isPrivateRoomCreation } = location;
  const insertedRoomId = match.params.roomId;

  const exitButtonHandler = () => {
    clientManager.exitRoom();
  };

  const history = useHistory();

  if (!clientManagerInitialized) {
    clientManager = new ClientManager({
      history,
      insertedRoomId,
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
        alert('카메라를 허용해주세요');
      });
    clientManager.setClientManagerInitialized(true);
  }

  const classes = useStyles();

  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);
  const isMobile = window.innerWidth < MOBILE_VIEW_BREAKPOINT;
  const [
    mobileChattingPanelVisibility,
    setMobileChattingPanelVisibility,
  ] = useState(isMobile);
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(!isMobile);
  let previousWindowInnerWidth = window.innerWidth;

  const playerPanelContainerClasses = (() => {
    return isPlayerListVisible
      ? classes.playerPanelContainer
      : [classes.playerPanelContainer, classes.mobileViewHide];
  })();

  const bottomLeftButtonContainerClasses = (() => {
    return gameStatus === 'waiting'
      ? [classes.mobileBottomLeftButtonContainer, classes.desktopViewHide]
      : classes.gameStartHide;
  })();

  const isShiftingToMobileView = currentIsMobile => {
    return currentIsMobile && previousWindowInnerWidth > MOBILE_VIEW_BREAKPOINT;
  };

  const isShiftingToDesktopView = currentIsMobile => {
    return (
      !currentIsMobile && previousWindowInnerWidth <= MOBILE_VIEW_BREAKPOINT
    );
  };

  const resizeHandler = event => {
    const currentIsMobile = event.target.innerWidth < MOBILE_VIEW_BREAKPOINT;
    setMobileChattingPanelVisibility(currentIsMobile);
    if (isShiftingToMobileView(currentIsMobile)) {
      setIsPlayerListVisible(false);
      previousWindowInnerWidth = event.target.innerWidth;
      return;
    }
    if (isShiftingToDesktopView(currentIsMobile)) {
      setIsPlayerListVisible(true);
      previousWindowInnerWidth = event.target.innerWidth;
    }
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
    window.addEventListener('resize', resizeHandler);
  }, []);

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
  };

  return <GamePresentation gameProps={gameProps} />;
};

Game.propTypes = {
  location: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};

export default Game;
