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

const ChattingWindow = ({ chattingList }) => {
  const classes = useStyle();
  const messageEndRef = useRef(null);
  const scrollToButtom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(scrollToButtom, [chattingList]);
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

/**
 * propstype 지정시 array는 arrayOf / object는 shape
 */
ChattingWindow.propTypes = {
  chattingList: PropTypes.arrayOf.isRequired,
};

export default ChattingWindow;
