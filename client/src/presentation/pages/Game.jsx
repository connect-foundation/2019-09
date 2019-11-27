import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Timer, QuizDisplay, ExitButton } from '../components';
import { StreamingPanel, ChattingPanel, PlayerPanel } from '../containers';
import { GlobalContext } from '../../contexts';
import SocketClient from '../../service/socket/SocketClient';
import {
  MEDIA_CONSTRAINTS,
  PEER_CONNECTION_CONFIG,
} from '../../service/socket/config';

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

const Game = () => {
  let socketClient;
  const { roomId } = useContext(GlobalContext);
  const classes = useStyles();
  const candidateWords = ['airplane', 'coffee', 'cup']; // Demo Purpose
  const currentSeconds = '120'; // Demo Purpose
  const quizWord = 'hello'; // Demo Purpose

  useEffect(() => {
    socketClient = new SocketClient({
      mediaConstraints: MEDIA_CONSTRAINTS,
      peerConnectionConfig: PEER_CONNECTION_CONFIG,
    });
    socketClient.init(roomId);
  }, []);

  // const readyButtonHandler = () => {
  //   const isReady = true;
  //   socketClient.emitReady(isReady);
  // };

  const exitButtonHandler = () => {
    socketClient.stopStream();
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
            <Link to="/">
              <ExitButton onClick={exitButtonHandler}>Exit</ExitButton>
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={0} className={classes.bottomGrid}>
        <Grid item xs={2} className={classes.bottomGridContent}>
          <PlayerPanel />
        </Grid>
        <Grid item xs={7} className={classes.bottomGridContent}>
          <StreamingPanel words={candidateWords} isVisible />
        </Grid>
        <Grid item xs={3} className={classes.bottomGridContent}>
          <ChattingPanel />
        </Grid>
      </Grid>
    </div>
  );
};

Game.propTypes = {};

export default Game;
