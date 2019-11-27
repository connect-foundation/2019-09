import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MessageInput from './MessageInput';
import { SendButton } from './Buttons';
import { CONSTANT_VALUES } from '../../utils';

const useStyles = makeStyles({
  InputWindow: {
    display: 'flex',
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    right: '1rem',
  },
});

const InputWindow = ({ clientManager, nickname }) => {
  const [value, setValue] = useState('');
  const classes = useStyles();
  const sendChattingMessageHandler = () => {
    clientManager.sendChattingMessage({
      nickname,
      message: value,
    });
    setValue('');
  };
  return (
    <Box className={classes.InputWindow}>
      <MessageInput
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        onKeyUp={e => {
          if (e.keyCode === CONSTANT_VALUES.ENTER_KEYCODE) {
            sendChattingMessageHandler();
          }
        }}
      />
      <SendButton onClick={sendChattingMessageHandler}>Send</SendButton>
    </Box>
  );
};

InputWindow.propTypes = {
  clientManager: PropTypes.shape.isRequired,
  nickname: PropTypes.string.isRequired,
};

export default InputWindow;
