import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styleColors from '../../constants/styleColors';

const useStyles = makeStyles(() => ({
  timer: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: styleColors.PURE_WHITE_COLOR,
    textAlign: 'center',
  },
}));

const CenterTimer = ({ currentSeconds }) => {
  const classes = useStyles();
  return <div className={classes.timer}>{currentSeconds}</div>;
};

CenterTimer.propTypes = {
  currentSeconds: PropTypes.string.isRequired,
};

export default CenterTimer;
