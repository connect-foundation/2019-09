import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const UnderlinedLetter = ({ letter }) => {
  const useStyles = makeStyles(() => ({
    underlinedLetter: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
  }));

  const classes = useStyles();

  return <span className={classes.underlinedLetter}>{letter}</span>;
};

UnderlinedLetter.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default UnderlinedLetter;
