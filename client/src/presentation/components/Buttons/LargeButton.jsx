/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const LargeButton = ({ text, onClick, style }) => {
  const useStyles = makeStyles({
    button: {
      background: '#5A96FF',
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: style.height || '',
      width: style.width || '',
      padding: '0 30px',
      '&:hover': {
        background: '#497FDB',
      },
    },
  });
  const classes = useStyles();
  return (
    <Button onClick={onClick} variant="contained" className={classes.button}>
      {text}
    </Button>
  );
};

LargeButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
};

export default LargeButton;
