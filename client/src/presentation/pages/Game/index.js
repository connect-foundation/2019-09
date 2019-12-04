import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ClientManager from '../../../service/ClientManager';
import { browserLocalStorage } from '../../../utils';
import { MOBILE_VIEW_BREAKPOINT } from '../../../config';
import { GlobalContext } from '../../../contexts';
import GamePresentation from './presenter';
import useStyles from './style';

const checkStoredNickname = () => {
  const nickname = browserLocalStorage.getNickname();
  const history = useHistory();
  if (!nickname) history.push('/');
};

let flag = false;
let clientManager;

const Game = () => {
  const classes = useStyles();
  checkStoredNickname();

  const { gameProgress } = useContext(GlobalContext);

  if (!flag) {
    clientManager = new ClientManager();
    clientManager.init();
    flag = true;
  }
  const candidateWords = ['airplane', 'coffee', 'cup']; // Demo Purpose
  const currentSeconds = '120'; // Demo Purpose
  const quizWord = 'hello'; // Demo Purpose
  const exitButtonHandler = () => {
    flag = false;
    clientManager.exitRoom();
  };

  useEffect(() => {
    window.onpopstate = () => {
      exitButtonHandler();
    };
  }, []);

  const isMobile = window.outerWidth < MOBILE_VIEW_BREAKPOINT;
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(!isMobile);
  let previousWindowOuterWidth = window.outerWidth;

  const changeDesktopToMobile = currentIsMobile => {
    return currentIsMobile && previousWindowOuterWidth > MOBILE_VIEW_BREAKPOINT;
  };

  const changeMobileToDesktop = currentIsMobile => {
    return (
      !currentIsMobile && previousWindowOuterWidth <= MOBILE_VIEW_BREAKPOINT
    );
  };

  const resizeHandler = event => {
    const currentIsMobile = event.target.outerWidth < MOBILE_VIEW_BREAKPOINT;

    if (changeDesktopToMobile(currentIsMobile)) {
      setIsPlayerListVisible(false);
      previousWindowOuterWidth = event.target.outerWidth;
    } else if (changeMobileToDesktop(currentIsMobile)) {
      setIsPlayerListVisible(true);
      previousWindowOuterWidth = event.target.outerWidth;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
  }, []);

  const playerPanelContainerClasses = () => {
    if (isPlayerListVisible) {
      return classes.playerPanelContainer;
    }
    return [classes.playerPanelContainer, classes.mobileViewHide];
  };

  const readyButtonContainerClasses = () => {
    if (gameProgress === 'waiting') {
      return [classes.mobileReadyButtonContainer, classes.desktopViewHide];
    }
    return classes.gameStartHide;
  };

  const showPlayersButtonHandler = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  const { viewPlayerList } = useContext(GlobalContext);
  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);

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
  };

  return <GamePresentation gameProps={gameProps} />;
};

Game.propTypes = {};

export default Game;
