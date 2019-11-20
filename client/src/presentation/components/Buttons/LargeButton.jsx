import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: '#5A96FF',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 32,
    width: 240,
    padding: '0 30px',
    '&:hover': {
      background: '#497FDB',
    },
  },
});

const LargeButton = ({ text, onClick }) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} variant="contained" className={classes.root}>
      {text}
    </Button>
  );
};

LargeButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LargeButton;
