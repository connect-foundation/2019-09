import React from 'react';
// import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MessageInput from './MessageInput';
import { SendButtton } from './Buttons';

const useStyles = makeStyles({
  InputWindow: {
    display: 'flex',
  },
});

const InputWindow = () => {
  const classes = useStyles();
  return (
    <Box className={classes.InputWindow}>
      <MessageInput />
      <SendButtton>Send</SendButtton>
    </Box>
  );
};

InputWindow.propTypes = {};

export default InputWindow;
