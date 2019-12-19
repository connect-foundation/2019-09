/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MessageInput from './MessageInput';
import { SendButton } from './Buttons';
import { ENTER_KEYCODE } from '../../constants/browser';
import { MAX_CHAT_LENGTH } from '../../constants/inputConstraints';

const useStyles = makeStyles(theme => ({
  InputWindow: {
    display: 'flex',
    padding: '1rem',
    height: '10%',
    boxSizing: 'border-box',
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
}));

const InputWindow = ({ clientManager, chattingDisabled }) => {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const sendChattingMessageHandler = () => {
    if (!value) return;
    clientManager.sendChattingMessage({
      message: value,
    });
    setValue('');
  };

  const messageInputOnChangeHandler = event => {
    if (event.target.value.length <= 40) {
      setValue(event.target.value);
    }
  };

  const messageInputOnKeyPressHandler = event => {
    if (event.charCode === ENTER_KEYCODE) {
      sendChattingMessageHandler();
    }
  };

  return (
    <Box className={classes.InputWindow}>
      <MessageInput
        value={value}
        chattingDisabled={chattingDisabled}
        onChange={messageInputOnChangeHandler}
        onKeyPress={messageInputOnKeyPressHandler}
        maxLength={MAX_CHAT_LENGTH}
      />
      <SendButton
        chattingDisabled={chattingDisabled}
        onClick={sendChattingMessageHandler}
      >
        Send
      </SendButton>
    </Box>
  );
};

InputWindow.defaultProps = {
  clientManager: {},
  chattingDisabled: false,
};

InputWindow.propTypes = {
  clientManager: PropTypes.object,
  chattingDisabled: PropTypes.bool,
};

export default InputWindow;
