import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Timer, QuizDisplay } from '../components';
import { StreamingPanel } from '../containers';
import { GlobalContext } from '../../contexts';
import SocketClient from '../../service/socket/SocketClient';
import {
  MEDIA_CONSTRAINTS,
  PEER_CONNECTION_CONFIG,
} from '../../service/socket/config';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  timerBox: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gameHeader: {
    backgroundColor: '#5a96ff',
  },
}));

const Game = () => {
  const { state } = useContext(GlobalContext);
  let socketClient;
  useEffect(() => {
    console.log(state.roomId);
    socketClient = new SocketClient({
      mediaConstraints: MEDIA_CONSTRAINTS,
      peerConnectionConfig: PEER_CONNECTION_CONFIG,
    });

    socketClient.init(state.roomId);
  }, []);
  const classes = useStyles();
  const candidateWords = ['airplane', 'coffee', 'cup'];
  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.gameHeader}>
        <Grid item xs>
          <Box className={classes.timerBox}>
            <Timer currentSeconds="120" />
          </Box>
        </Grid>
        <Grid item xs justify="center" alignItems="center" container>
          <Box className={classes.paper}>
            <QuizDisplay word="hello" isSecret />
          </Box>
        </Grid>
        <Grid item xs>
          <Box className={classes.paper}>xs</Box>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Box className={classes.paper}>xs</Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.paper}>
            <StreamingPanel words={candidateWords} isVisible />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.paper}>xs</Box>
        </Grid>
      </Grid>
    </div>
  );
};

Game.propTypes = {};

export default Game;
