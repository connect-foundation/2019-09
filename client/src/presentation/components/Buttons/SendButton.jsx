import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import buttonStyle from './style';

const useStyles = makeStyles({
  button: {
    ...buttonStyle,
    flex: 1,
    marginLeft: '0.5rem',
  },
});

const SendButton = ({ onClick, children, chattingDisabled }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      variant="contained"
      className={classes.button}
      disabled={chattingDisabled}
    >
      {children}
    </Button>
  );
};

SendButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  chattingDisabled: PropTypes.bool.isRequired,
};

export default SendButton;
