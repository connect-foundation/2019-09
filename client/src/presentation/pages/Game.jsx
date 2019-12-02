import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Timer, QuizDisplay, ExitButton } from '../components';
import { StreamingPanel, ChattingPanel, PlayerPanel } from '../containers';
import ClientManager from '../../service/ClientManager';
import { browserLocalStorage, STYLE_COLORS } from '../../utils';

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
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
  readyButtonContainer: {
    // position: 'absolute',
    // bottom: '0',
    // left: '2rem',
    // right: '2rem',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  playerPanelButton: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'relative',
      top: '11rem',
    },
  },
  exitButtonGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  bottomGrid: {
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
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
        <Grid item xs className={classes.exitButtonGrid}>
          <Box className={classes.paper}>
            <Link to="/" onClick={exitButtonHandler}>
              <ExitButton>Exit</ExitButton>
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={0} className={classes.bottomGrid}>
        <Grid
          item
          xs={2}
          className={(classes.bottomGridContent, classes.leftGridContent)}
        >
          <Box className={classes.readyButtonContainer}>
            <PlayerPanel clientManager={clientManager} />
          </Box>
          <Box className={classes.playerPanelButton}>
            <button
              type="button"
              onClick={event => {
                const { target } = event;
                const grandParent = target.parentElement.parentElement;
                const children = grandParent.childNodes;
                children.forEach(child => {
                  console.log(child);
                  if (child !== target.parentElement) {
                    if (child.style.display === 'none') {
                      // eslint-disable-next-line no-param-reassign
                      child.style.display = 'block';
                      // eslint-disable-next-line no-param-reassign
                      target.innerText = 'Hide Players';
                      return;
                    }
                    // eslint-disable-next-line no-param-reassign
                    child.style.display = 'none';
                    // eslint-disable-next-line no-param-reassign
                    target.innerText = 'Show Players';
                  }
                });
              }}
            >
              Show Players
            </button>
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
