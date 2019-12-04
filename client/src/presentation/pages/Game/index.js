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

const Game = () => {
  if (!browserLocalStorage.getNickname()) {
    const history = useHistory();
    history.push('/');
  }

  if (!isClientManagerInitialized) {
    clientManager = new ClientManager();
    clientManager.init();
    isClientManagerInitialized = true;
  }

  const classes = useStyles();
  const { gameProgress } = useContext(GlobalContext);
  const { viewPlayerList } = useContext(GlobalContext);
  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);
  const candidateWords = ['airplane', 'coffee', 'cup']; // Demo Purpose
  const currentSeconds = '120'; // Demo Purpose
  const quizWord = 'hello'; // Demo Purpose
  const isMobile = window.outerWidth < MOBILE_VIEW_BREAKPOINT;
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(!isMobile);
  let previousWindowOuterWidth = window.outerWidth;

  const playerPanelContainerClasses = (() => {
    return isPlayerListVisible
      ? classes.playerPanelContainer
      : [classes.playerPanelContainer, classes.mobileViewHide];
  })();

  const readyButtonContainerClasses = (() => {
    return gameProgress === 'waiting'
      ? [classes.mobileReadyButtonContainer, classes.desktopViewHide]
      : classes.gameStartHide;
  })();

  const isShiftingToMobileView = currentIsMobile => {
    return currentIsMobile && previousWindowOuterWidth > MOBILE_VIEW_BREAKPOINT;
  };

  const isShiftingToDesktopView = currentIsMobile => {
    return (
      !currentIsMobile && previousWindowOuterWidth <= MOBILE_VIEW_BREAKPOINT
    );
  };

  const exitButtonHandler = () => {
    isClientManagerInitialized = false;
    clientManager.exitRoom();
  };

  const resizeHandler = event => {
    const currentIsMobile = event.target.outerWidth < MOBILE_VIEW_BREAKPOINT;
    if (isShiftingToMobileView(currentIsMobile)) {
      setIsPlayerListVisible(false);
      previousWindowOuterWidth = event.target.outerWidth;
      return;
    }
    if (isShiftingToDesktopView(currentIsMobile)) {
      setIsPlayerListVisible(true);
      previousWindowOuterWidth = event.target.outerWidth;
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
    quizWord,
    exitButtonHandler,
    clientManager,
    showPlayersButtonHandler,
    candidateWords,
    playerPanelContainerClasses,
    readyButtonContainerClasses,
    localPlayer,
    currentSeconds,
    classes,
    readyButtonHandler,
    isMobile,
  };

  return <GamePresentation gameProps={gameProps} />;
};

Game.propTypes = {};

export default Game;
