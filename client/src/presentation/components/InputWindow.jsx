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
    padding: '1rem',
    height: '10%',
    boxSizing: 'border-box',
  },
});

const InputWindow = ({ clientManager, nickname, isChattingDisabled }) => {
  const [value, setValue] = useState('');
  const classes = useStyles();
  const sendChattingMessageHandler = () => {
    if (!value) return;
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
        isChattingDisabled={isChattingDisabled}
        onChange={e => {
          setValue(e.target.value);
        }}
        onKeyPress={e => {
          if (e.charCode === CONSTANT_VALUES.ENTER_KEYCODE) {
            sendChattingMessageHandler();
          }
        }}
      />
      <SendButton
        isChattingDisabled={isChattingDisabled}
        onClick={sendChattingMessageHandler}
      >
        Send
      </SendButton>
    </Box>
  );
};

InputWindow.propTypes = {
  clientManager: PropTypes.shape.isRequired,
  nickname: PropTypes.string.isRequired,
  isChattingDisabled: PropTypes.bool.isRequired,
};

export default InputWindow;
