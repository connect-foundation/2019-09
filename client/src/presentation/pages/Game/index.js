import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ClientManager from '../../../service/ClientManager';
import { browserLocalStorage } from '../../../utils';
import { MOBILE_VIEW_BREAKPOINT } from '../../../config';
import { GlobalContext } from '../../../contexts';
import GamePresentation from './presenter';
import useStyles from './style';

let isClientManagerInitialized = false;
let clientManager;

const exitButtonHandler = () => {
  isClientManagerInitialized = false;
  clientManager.exitRoom();
};

const Game = () => {
  const history = useHistory();
  if (!browserLocalStorage.getNickname()) {
    history.push('/');
  }

  if (!isClientManagerInitialized) {
    clientManager = new ClientManager();
    clientManager.init();
    clientManager.getMediaPermission().catch(() => {
      exitButtonHandler();
      alert('카메라를 허용해주세요');
    });
    isClientManagerInitialized = true;
  }

  const classes = useStyles();
  const {
    gameStatus,
    viewPlayerList,
    currentSeconds,
    quiz,
    quizLength,
  } = useContext(GlobalContext);
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

  const readyButtonContainerClasses = (() => {
    return gameStatus === 'waiting'
      ? [classes.mobileReadyButtonContainer, classes.desktopViewHide]
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
    readyButtonContainerClasses,
    localPlayer,
    currentSeconds,
    classes,
    readyButtonHandler,
    mobileChattingPanelVisibility,
  };

  return <GamePresentation gameProps={gameProps} />;
};

Game.propTypes = {};

export default Game;
