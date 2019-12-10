import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import timerImageSource from '../../assets/timer.png';

const useStyles = makeStyles(() => ({
  timer: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timerImage: {
    width: '4rem',
    verticalAlign: 'middle',
    marginRight: '0.5rem',
  },
  timerText: {
    verticalAlign: 'middle',
    fontWeight: 400,
  },
}));

const Timer = ({ currentSeconds }) => {
  const classes = useStyles();

  return (
    <div className={classes.timer}>
      <img className={classes.timerImage} src={timerImageSource} alt="" />
      <span className={classes.timerText}>{currentSeconds}</span>
    </div>
  );
};

Timer.propTypes = {
  currentSeconds: PropTypes.string.isRequired,
};

export default Timer;
