import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import buttonStyle from './style';

const useStyles = makeStyles({
  button: {
    ...buttonStyle,
    width: 'auto',
    height: 'auto',
    padding: '0.5rem 1rem',
    fontSize: '2rem',
    zIndex: '10',
  },
});

const CandidateButton = ({ onClick, children }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={() => {
        onClick(children);
      }}
      variant="contained"
      className={classes.button}
    >
      {children}
    </Button>
  );
};

CandidateButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CandidateButton;
