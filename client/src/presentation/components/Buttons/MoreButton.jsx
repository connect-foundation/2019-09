import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import buttonStyle from './style';

const useStyles = makeStyles({
  button: {
    ...buttonStyle,
    width: '20rem',
    height: '3.2rem',
  },
});

const MoreButton = ({ onClick, children }) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} variant="contained" className={classes.button}>
      {children}
    </Button>
  );
};

MoreButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MoreButton;
