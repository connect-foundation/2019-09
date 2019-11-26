import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MessageInput from './MessageInput';
import { SendButton } from './Buttons';

const useStyles = makeStyles({
  InputWindow: {
    display: 'flex',
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    right: '1rem',
  },
});

const InputWindow = () => {
  const classes = useStyles();
  return (
    <Box className={classes.InputWindow}>
      <MessageInput />
      <SendButton>Send</SendButton>
    </Box>
  );
};

export default InputWindow;
