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
    fontSize: '1.5rem',
  },
});

const SendButton = ({ onClick, children }) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} variant="contained" className={classes.button}>
      {children}
    </Button>
  );
};

SendButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SendButton;
