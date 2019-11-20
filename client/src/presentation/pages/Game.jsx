import React from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Timer } from '../components';

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.gameHeader}>
        <Grid item xs>
          <Box className={classes.timerBox}>
            <Timer currentSeconds="120" />
          </Box>
        </Grid>
        <Grid item xs>
          <Box className={classes.paper}>xs</Box>
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
          <Box className={classes.paper}>xs=6</Box>
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
