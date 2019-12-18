/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ChattingRow from './ChattingRow';

const useStyle = makeStyles({
  chattingWindow: {
    overflowY: 'auto',
    padding: '1rem',
    height: '100%',
    boxSizing: 'border-box',
  },
});

const scrollToBottom = messageEndRef => {
  if (!messageEndRef.current.scrollIntoView) return;
  messageEndRef.current.scrollIntoView({ behavior: 'auto' });
};

const useScrollToBottom = (messageEndRef, chattingList) => {
  useEffect(scrollToBottom.bind(null, messageEndRef), [chattingList]);
};

const ChattingWindow = ({ chattingList }) => {
  const classes = useStyle();
  const messageEndRef = useRef();
  useScrollToBottom(messageEndRef, chattingList);
  const chattingRowList = chattingList.map(chatting => {
    return (
      <ChattingRow
        key={chatting.id}
        nickname={chatting.nickname}
        nicknameColor={chatting.nicknameColor}
        message={chatting.message}
      />
    );
  });
  return (
    <Box className={classes.chattingWindow}>
      <ul>{chattingRowList}</ul>
      <div ref={messageEndRef} />
    </Box>
  );
};

ChattingWindow.defaultProps = {
  chattingList: [],
};

ChattingWindow.propTypes = {
  chattingList: PropTypes.array,
};

export default ChattingWindow;
