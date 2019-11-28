import React /** useContext, useEffect */ from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Timer, QuizDisplay, ExitButton } from '../components';
import { StreamingPanel, ChattingPanel, PlayerPanel } from '../containers';
import ClientManager from '../../service/ClientManager';
import { browserLocalStorage } from '../../utils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
    height: '100%',
    background: '#E5F1FF',
    overflow: 'auto',
  },
  timerBox: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gameHeader: {
    backgroundColor: '#5a96ff',
  },
  vidoeBox: {
    padding: theme.spacing(2),
    height: '100%',
  },
  readyButtonContainer: {
    position: 'absolute',
    bottom: '0',
    left: '2rem',
    right: '2rem',
  },
  exitButtonGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  bottomGrid: {
    height: 'auto',
  },
  bottomGridContent: {
    padding: '1rem',
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
        <Grid item xs={2} className={classes.bottomGridContent}>
          <PlayerPanel clientManager={clientManager} />
        </Grid>
        <Grid item xs={7} className={classes.bottomGridContent}>
          <StreamingPanel words={candidateWords} isVisible />
        </Grid>
        <Grid item xs={3} className={classes.bottomGridContent}>
          <ChattingPanel clientManager={clientManager} />
        </Grid>
      </Grid>
    </div>
  );
};

Game.propTypes = {};

export default Game;
