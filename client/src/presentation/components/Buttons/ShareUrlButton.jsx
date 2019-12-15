import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import buttonStyle from './style';

const useStyles = makeStyles({
  button: {
    ...buttonStyle,
    width: '100%',
    height: '3.2rem',
  },
});

const ShareUrlButton = ({ onClick, children, classNames }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      variant="contained"
      className={[...classNames, classes.button]}
    >
      {children}
    </Button>
  );
};

ShareUrlButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classNames: PropTypes.shape.isRequired,
};

export default ShareUrlButton;
