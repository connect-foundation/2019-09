import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Timer, QuizDisplay, ExitButton, ReadyButton } from '../components';
import {
  StreamingPanel,
  ChattingPanel,
  PlayerPanel,
  MobileChattingPanel,
} from '../containers';
import ClientManager from '../../service/ClientManager';
import { browserLocalStorage, STYLE_COLORS } from '../../utils';
import { MOBILE_VIEW_BREAKPOINT } from '../../config';
import { GlobalContext } from '../../contexts';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
    height: '100%',
    background: STYLE_COLORS.BACKGROUND_COLOR,
    overflow: 'auto',
  },
  timerBox: {
    padding: '1rem 2rem',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  gameHeader: {
    backgroundColor: STYLE_COLORS.THEME_COLOR,
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.7)',
  },
  videoBox: {
    padding: theme.spacing(2),
    height: '100%',
  },
  leftGridContent: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      position: 'absolute',
      zIndex: '1',
    },
  },
  playerPanelContainer: {
    // position: 'absolute',
    // bottom: '0',
    // left: '2rem',
    // right: '2rem',
    display: 'block',
  },
  playerPanelButton: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'relative',
      top: '1rem',
      left: '1rem',
    },
  },
  mobileViewHide: {
    display: 'none',
  },
  topRightGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  exitButtonContainer: {
    padding: '0.5rem 2rem',
  },
  bottomGrid: {
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'relative',
    },
  },
  bottomGridContent: {
    padding: '1rem',
  },
  mobileFullWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: 'none',
    },
  },
  chattingContainer: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: 'none',
      position: 'fixed',
      height: 'auto',
      bottom: '0',
    },
  },
  desktopViewHide: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  mobileChattingPanel: {
    position: 'absolute',
    height: '100%',
    top: '0',
    right: '0',
    overflow: 'scroll',
  },
  mobileReadyButtonContainer: {
    width: '8rem',
    position: 'absolute',
    bottom: '2rem',
    left: '2rem',
  },
  gameStartHide: {
    display: 'none',
  },
}));

const checkStoredNickname = () => {
  const nickname = browserLocalStorage.getNickname();
  const history = useHistory();
  if (!nickname) history.push('/');
};

let flag = false;
let clientManager;

const Game = () => {
  checkStoredNickname();

  const { gameProgress } = useContext(GlobalContext);

  if (!flag) {
    clientManager = new ClientManager();
    clientManager.init();
    flag = true;
  }
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.gameHeader}>
        <Grid item xs>
          <Box className={classes.timerBox}>
            <Timer currentSeconds={currentSeconds} />
          </Box>
        </Grid>
        <Grid item xs justify="center" alignItems="center" container>
          <Box className={classes.paper}>
            <QuizDisplay word={quizWord} isSecret />
          </Box>
        </Grid>
        <Grid item xs className={classes.topRightGrid}>
          <Box className={classes.exitButtonContainer}>
            <Link to="/" onClick={exitButtonHandler}>
              <ExitButton />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={0} className={classes.bottomGrid}>
        <Grid
          item
          xs={2}
          className={[classes.bottomGridContent, classes.leftGridContent]}
        >
          <Box className={playerPanelContainerClasses()}>
            <PlayerPanel clientManager={clientManager} />
          </Box>
          <Box className={classes.playerPanelButton}>
            <Button
              variant="outlined"
              color="primary"
              onClick={showPlayersButtonHandler}
            >
              Players
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={7}
          className={[classes.bottomGridContent, classes.mobileFullWidth]}
        >
          <StreamingPanel
            words={candidateWords}
            isVisible={false}
            className={classes.mobileFullWidth}
          />
          <Box className={readyButtonContainerClasses()}>
            <ReadyButton
              onClick={() => {
                clientManager.toggleReady();
              }}
            >
              {localPlayer && localPlayer.isReady ? 'Cancel' : 'Ready'}
            </ReadyButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          className={[
            classes.bottomGridContent,
            classes.desktopViewHide,
            classes.mobileChattingPanel,
          ]}
        >
          <MobileChattingPanel clientManager={clientManager} />
        </Grid>
        <Grid
          item
          xs={3}
          className={[classes.bottomGridContent, classes.chattingContainer]}
        >
          <ChattingPanel clientManager={clientManager} />
        </Grid>
      </Grid>
    </div>
  );
};

Game.propTypes = {};

export default Game;
