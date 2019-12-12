import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ClientManager from '../../../service/ClientManager';
import { browserLocalStorage } from '../../../utils';
import { MOBILE_VIEW_BREAKPOINT } from '../../../config';
import { GlobalContext } from '../../../contexts';
import GamePresentation from './presenter';
import useStyles from './style';
import useShiftingToWhichView from '../../../hooks/useShiftingToWhichView';
import useIsMobile from '../../../hooks/useIsMobile';

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

  const shiftingToWhichView = useShiftingToWhichView(MOBILE_VIEW_BREAKPOINT);
  const currentIsMobile = useIsMobile(MOBILE_VIEW_BREAKPOINT);
  const isMobile = window.innerWidth < MOBILE_VIEW_BREAKPOINT;

  const [
    mobileChattingPanelVisibility,
    setMobileChattingPanelVisibility,
  ] = useState(isMobile);

  const [isPlayerListVisible, setIsPlayerListVisible] = useState(!isMobile);

  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);

  const readyButtonContainerClasses = (() => {
    return gameStatus === 'waiting'
      ? [classes.mobileReadyButtonContainer, classes.desktopViewHide]
      : classes.gameStartHide;
  })();

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
  }, [currentIsMobile]);

  useEffect(() => {
    if (shiftingToWhichView === 'mobile') {
      setIsPlayerListVisible(false);
    } else if (shiftingToWhichView === 'desktop') {
      setIsPlayerListVisible(true);
    }
  }, [shiftingToWhichView]);

  const playerPanelContainerClasses = (() => {
    return isPlayerListVisible
      ? classes.playerPanelContainer
      : [classes.playerPanelContainer, classes.mobileViewHide];
  })();

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
